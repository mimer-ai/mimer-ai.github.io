# Mimer AI Lessons Site - Project Guide

This is a static site built with [Zola](https://www.getzola.org/), a fast static site generator written in Rust. The site showcases AI learning materials with filtering, search, and external lesson links.

## Project Structure

```
.
├── AGENTS.md                    # This file - project documentation
├── zola.toml                    # Zola configuration file
├── content/                     # Content files (Markdown)
│   ├── _index.md                # Home page content
│   └── lessons/                 # Lessons section
│       ├── _index.md            # Lessons index page
│       └── deep-learning-intro.md # Example lesson
├── static/                      # Static assets
│   └── js/                      # JavaScript files
│       └── search.js            # Search functionality (legacy)
├── templates/                   # Tera templates
│   ├── base.html                # Base template (all pages extend this)
│   ├── header.html              # Site header with navigation
│   ├── footer.html              # Site footer
│   ├── index.html               # Home page template
│   ├── page.html                # Single page template (lessons)
│   ├── lessons.html             # Lessons grid with filters
│   └── partials/                # Reusable template partials
│       └── badges.html          # Taxonomy badge rendering
└── themes/                      # Zola themes (empty)
```

## Prerequisites

### Zola Installation

**Option 1: Download Pre-built Binary (Recommended)**

Download the latest release for your platform from [Zola Releases](https://github.com/getzola/zola/releases):

```bash
# For Linux x86_64
wget https://github.com/getzola/zola/releases/download/v0.22.1/zola-v0.22.1-x86_64-unknown-linux-gnu.tar.gz
mkdir -p /tmp/zola && tar -xzf zola-v0.22.1-x86_64-unknown-linux-gnu.tar.gz -C /tmp/zola
# Add to PATH
export PATH="/tmp/zola:$PATH"
```

**Option 2: Flatpak**

```bash
flatpak install flathub org.getzola.zola
flatpak run org.getzola.zola --help
```

**Option 3: Cargo (Rust)**

```bash
cargo install --git https://github.com/getzola/zola
```

Verify installation:
```bash
zola --version
```

## Development

### Build the Site

```bash
# Build to public/ directory
zola build

# Or use the full path if Zola is in /tmp/zola
/tmp/zola/zola build
```

### Local Development Server

```bash
# Start server with live reload at http://127.0.0.1:1111
zola serve

# Or with full path
/tmp/zola/zola serve
```

The server automatically watches for file changes and rebuilds the site.

### Check for Errors

```bash
zola check
```

## Content Structure

### Lessons

Lessons are stored in `content/lessons/` as Markdown files. Each lesson uses front matter to define metadata:

```toml
+++
title = "Lesson Title"
description = "Lesson description"

[taxonomies]
skill = ["ai", "programming"]
difficulty = ["beginner"]
maturity = ["stable"]

[extra]
tags = ["python", "machine-learning"]
external_url = "https://learn.mimer-ai.eu/lesson-slug/"
+++

# Lesson content in Markdown
```

**Taxonomies:**
- `skill`: Categorizes lessons by skill area (ai, data, programming)
- `difficulty`: Difficulty level (beginner, intermediate, advanced)
- `maturity`: Content maturity (alpha, beta, stable)

**Extra Fields:**
- `external_url`: URL to the actual lesson content (hosted externally)
- `tags`: Additional tags for categorization

### Adding a New Lesson

1. Create a new Markdown file in `content/lessons/`
2. Add front matter with title, description, taxonomies, and external_url
3. Write the lesson content in Markdown
4. The lesson will automatically appear in the lessons grid

## Templates

### Template Hierarchy

- `base.html`: Root template with HTML structure, Tailwind CSS, and Fuse.js
- `header.html`: Site navigation with dropdown menus
- `footer.html`: Site footer
- `lessons.html`: Lesson grid with filtering and search
- `page.html`: Individual lesson page with external link button
- `partials/badges.html`: Reusable badge component for taxonomies

### Template Variables

**Global (config.extra):**
```toml
badge_colors = {
    skill = { ai = "#6366f1", data = "#4f46e5", programming = "#8b5cf6" },
    difficulty = { beginner = "#10b981", intermediate = "#f59e0b", advanced = "#ef4444" },
    maturity = { alpha = "#93c5fd", beta = "#60a5fa", stable = "#2563eb" }
}
```

**Page Variables:**
- `page.title`: Page title from front matter
- `page.description`: Page description from front matter
- `page.content`: Rendered Markdown content
- `page.taxonomies`: Taxonomy values (skill, difficulty, maturity)
- `page.extra`: Extra front matter fields (external_url, tags)
- `page.permalink`: Generated permalink
- `section.pages`: Pages in the current section (for listings)

## Features

### Filtering

The lessons page (`/lessons/`) includes client-side filtering by:
- Skill (dropdown)
- Difficulty (dropdown)
- Maturity (dropdown)
- Free text search

Filters work together and can be cleared with the "Clear Filters" button.

### Taxonomy Badges

Each lesson card and lesson page displays color-coded badges for:
- Skill (purple/blue colors)
- Difficulty (green/orange/red)
- Maturity (blue shades)

Badge colors are configurable in `zola.toml` under `[extra.badge_colors]`.

### External Links

Lessons link to external URLs defined in the `external_url` front matter field. The "Show the lesson" button on individual lesson pages takes users to the external URL.

## Styling

- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) via CDN
- **Font**: Inter from Google Fonts
- **Color Scheme**: Dark theme with slate backgrounds
- **Card Colors**: Lesson cards use `#122855` background
- **Hover Effect**: Silver glow on lesson cards
- **Button Style**: Indigo buttons with hover states

## Configuration

Edit `zola.toml` to modify:
- `base_url`: Site URL
- `taxonomies`: Taxonomy definitions
- `[extra]`: Custom variables (badge colors, etc.)
- `[markdown]`: Markdown rendering options
- `[search]`: Search index format

## Deployment

### GitHub Pages

```bash
# Build the site
zola build

# Commit and push
git add .
git commit -m "Update site"
git push origin zola-site
```

The `public/` directory contains the static site files ready for deployment.

## Troubleshooting

### Filters Not Working

1. Check that the `data-*` attributes are present on badge elements
2. Verify that the JavaScript event listeners are attached
3. Ensure the filter function is being called on user interaction

### Build Errors

Run `zola check` to identify configuration issues. Common problems:
- Invalid TOML syntax in front matter
- Missing required front matter fields
- Incorrect template syntax

### Styling Issues

- Tailwind classes are applied via CDN - ensure internet connection
- Check browser console for CSS errors
- Verify Tailwind config in `base.html`

## Resources

- [Zola Documentation](https://www.getzola.org/documentation/)
- [Tera Templates](https://tera.netlify.app/docs/) (Zola's templating engine)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Fuse.js](https://fusejs.io/) (search library, included but currently unused)

## Notes

- The site uses client-side filtering (no server-side processing)
- Search is implemented with simple string matching (Fuse.js is loaded but not currently used)
- Lesson content is hosted externally; this site is a catalog/index
- Badge colors can be customized per taxonomy value in `zola.toml`
