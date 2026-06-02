
# How to Use This Site

## Understanding the Front Matter

Every post starts with **front matter** - the section between `---` markers at the top of the file.

```yaml
---
title: "Your Post Title"
description: "Brief description of your post"
author: "someone like wrench"
tags: ["tag1", "tag2"]
---
```

## Step-by-Step Breakdown

Let's use this real example:

```yaml
---
title: "Bleeding Lama CVE-2026-7482"
description: "Critical vulnerability in Lama framework"
author: "someone like mikey"
tags: ["cve", "vulnerability"]
redirect: "https://w3nch.github.io/posts/bleeding-lama-cve-2026-7482/"
---
```

### Line by Line Explanation:

| Field | Value | What it does |
|-------|-------|--------------|
| `title` | `"Bleeding Lama CVE-2026-7482"` | Shows in search results and page header |
| `description` | `"Critical vulnerability in Lama framework"` | Shows below title in search results |
| `author` | `"wrench"` | Shows who wrote the post |
| `tags` | `["cve", "vulnerability"]` | Categories for filtering in search |
| `redirect` | `"https://w3nch.github.io/..."` | Optional — redirects users to an external URL |

### How Each Field Works:

#### 1. `title` (Required)
- The title of your post
- Appears in search results
- Shown at the top of your post page

#### 2. `description` (Optional but recommended)
- Brief summary of your post
- Shows in search result cards
- Helps users understand content before clicking

#### 3. `tags` (Optional)
- Array of category words
- Users can search by tags
- Example: `["cve", "windows", "exploit"]`

#### 4. `redirect` (Optional)
- **If included**: Users are redirected to the external URL
- **If omitted**: Users see your post content normally

## Two Types of Posts

### Type 1: Local Post (No Redirect)
```yaml
---
title: "My Research"
description: "Custom research content"
author: "someone like valkery"
tags: ["research"]
---

# My Research

Your full post content here in Markdown.
```

### Type 2: External Redirect Post
```yaml
---
title: "My Research"
description: "Link to my research on another site"
author: "someone like kin"
tags: ["research"]
redirect: "https://external-site.com/my-research/"
---
```

**Note**: When using `redirect`, you don't need to write content below the front matter.

## How to Submit

1. Create a new `.md` file in `content/posts/`
2. Add proper front matter
3. Either add content or use `redirect`
4. Submit a pull request

## Search

Use the search bar to find posts by:
- Title keywords
- Description text
- Tags

Example: Search for `cve` to find posts tagged with "cve".

## Rules

1. No copyrighted content
2. No malicious material
3. Security research focus only
4. Use descriptive titles and tags
