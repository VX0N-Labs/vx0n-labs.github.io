# VXON

Security research platform for CVE analysis, vulnerability research, and technical writeups.

## Quick Start

```bash
hugo server
```

Visit `http://localhost:1313`

## Deploy to GitHub Pages

Push to `main` branch and the GitHub Actions workflow will auto-deploy.

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

### External Redirect (recommend)
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

## Future work
- [ ] Build the rendering engine so the md files can be render properly
- [ ] Add in a way to automatically get user blogs
- [ ] Make the UI/UX better 
- [ ] Add in search filters
