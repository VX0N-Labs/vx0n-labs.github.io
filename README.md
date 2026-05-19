# VXON

Security research platform for sharing writeups, CVE analysis, and technical research.

## Quick Start

```bash
hugo server
```

Visit `http://localhost:1313`

## Submitting Content

### Local Post
Create a new file in `content/posts/`:
```yaml
---
title: "Your Post Title"
description: "Brief description"
tags: ["tag1", "tag2"]
---

Your content here.
```

### External Redirect
```yaml
---
title: "External Post"
description: "Description"
tags: ["vulnerability"]
redirect: "https://external-site.com/posts/your-post/"
---
```

## Rules

- No copyrighted content
- No malicious material
- Security research focus
- Descriptive titles and tags

## Stack

- Hugo
- Vanilla CSS/JS
- No frameworks