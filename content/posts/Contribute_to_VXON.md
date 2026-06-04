
---
title: "Contributing to VXON Labs"
description: Everything you need to know to start contributing to VXON Labs, including submission guidelines, formatting rules, writing tips, and how to get your content published on the platform.
date: 2026-06-02
author: Vxon team
tags: ["contribute", "guide"]
---


Thank you for contributing to VXON Labs.

## Step 1: Fork the Repository

Click the **Fork** button on GitHub.

Repository:

https://github.com/VX0N-Labs/vx0n-labs.github.io
![Fork repo button](/images/fork-repo.png)

This creates a copy of the repository under your GitHub account.
![Fork success](/images/fork-success.png)

## Step 2: Clone Your Fork

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/vx0n-labs.github.io.git
cd vx0n-labs.github.io
```

## Step 3: Create a New Branch

Never work directly on `main`.

```bash
git checkout -b add-my-writeup
```

Examples:

```bash
git checkout -b add-cve-analysis
git checkout -b add-ctf-writeup
git checkout -b fix-typo
```

## Step 4: Add Your Content

Create your article in the appropriate content directory.

Example:

```text
vxon.github.io/content/posts/my-first-writeup.md
```

Example frontmatter:

```yaml
---
title: "Analyzing CVE-2026-XXXX"
author: "YOUR_USERNAME"
tags: [Writeup, Medium, Linux]
description: analyzing CVE-2026-xxx
redirect: "Link"
---
```

More information on formatting in [How to use this site](https://github.com/VX0N-Labs/vx0n-labs.github.io/blob/main/how-to-use-this-site.md)

## Step 5: Test Locally

Do not push without verifying it first. Install [Hugo](https://gohugo.io/installation/) if you have not already.

Run:

```bash
hugo server
```

Open:

```text
http://localhost:1313
```

Verify that your content renders correctly.

## Step 6: Commit Your Changes

```bash
git add .
git commit -m "Add CVE-2026-XXXX analysis"
```

## Step 7: Push Your Branch

```bash
git push origin add-my-writeup
```

## Step 8: Open a Pull Request

Go to your fork on GitHub.

GitHub will show a:

```text
Compare & pull request
```

![Create pull request](/images/create-pr.png)
Fill in:

### Title

```text
Add CVE-2026-XXXX analysis
```

### Description

```text
Summary:
- Added a new CVE analysis
- Included PoC explanation
- Added references

Category:
- Research
```

Click:

```text
Create Pull Request
```

## Review Process

A maintainer will:

* Review the content
* Request changes if needed
* Approve the pull request
* Merge it into the main site

## Rules

* Security research only
* No copyrighted material
* Use descriptive titles
* Include sources and references
* Keep content professional and technical

Thank you for contributing to VXON Labs.
