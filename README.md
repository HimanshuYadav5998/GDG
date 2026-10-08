<div align="center">

# Inkly — Modern Editorial Blog Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.0-black?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**A production-grade, responsive editorial blog management platform built for the GDG recruitment frontend development evaluation.**

*Light-Theme Only · Editorial Typography · Full LocalStorage Persistence · Complete CRUD*

[Explore Features](#-key-features) • [Design System](#-design-system--editorial-aesthetic) • [Architecture](#-project-architecture) • [Getting Started](#-getting-started) • [Routes](#-application-routes)

</div>

---

## 📌 Executive Summary

**Inkly** is an independent, distraction-free digital publishing and editorial management platform designed for long-form essays, system architectures, and design criticism. Built without relying on generic template dashboards or heavy external CMS solutions, it demonstrates advanced React 19 architecture, component modularity, fluid micro-interactions, responsive adaptability across mobile through ultra-wide screens, and end-to-end client-side data persistence.

---

## 🎨 Design System & Editorial Aesthetic

Taking visual inspiration from the refined typography, generous negative space, and curated photography found in editorial periodicals and modern design references (such as Lomography Community), Inkly creates a calm, high-signal reading experience.

### 1. Theme Philosophy: Strict Light Theme
In accordance with the project specification, **Inkly is strictly light-theme only**. No dark mode toggle is included, maintaining pure editorial contrast and print-like legibility.

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **`ink-bg`** | `#FFFFFF` | Primary viewport background & clean card surfaces |
| **`ink-surface`** | `#F7F7F5` | Warm editorial off-white surface for callouts, filters & footer |
| **`ink-border`** | `#E8E8E5` | Whisper-soft neutral divider borders |
| **`ink-primary`** | `#171717` | Deep neutral for headlines and primary text |
| **`ink-secondary`** | `#666666` | Muted prose secondary text and metadata |
| **`ink-muted`** | `#999999` | Captions, timestamps, and subtle UI cues |
| **`ink-accent`** | `#FF5A36` | Signature warm terracotta accent for highlights and active states |
| **`ink-accentSoft`** | `#FFF0EB` | Gentle selection and badge tint |

### 2. Typographic Hierarchy
* **Headings**: *DM Serif Display* (Google Fonts) — Classical editorial serif with high optical character.
* **Prose & User Interface**: *Inter* (Google Fonts) — Precise grotesque sans-serif with optimized geometric legibility.
* **Body Measure**: Strictly constrained to a maximum width of `760px` with an ergonomic line height of `1.85` for reading without cognitive fatigue.

---

## 🚀 Key Features

### 📖 Reader & Exploration Experience
* **Hero Editorial Feature**: Dynamic featured article banner with photography zoom effects, reading time estimation, and category badges.
* **Curated Homepage Layouts**:
  * *Latest Stories*: Rapid-access horizontal and 3-column article cards.
  * *Discipline Marquee*: Instant category jumping across 8 primary topics.
  * *Curated Architecture Grid*: Asymmetric editorial magazine grid.
* **Explore Discovery Engine (`/explore`)**:
  * Real-time debounced frontend search querying titles, subtitles, markdown content, tags, authors, and categories simultaneously.
  * Instant category filtering pills with dynamic story counts.
  * Multi-metric sorting (*Latest*, *Most Popular [Views]*, *Most Liked*, *Bookmarked*, *Oldest*).
* **Article Details & Reading Immersion (`/blog/:slug`)**:
  * **Reading Progress Bar**: Live scroll-driven indicator pinned to the top of the browser window.
  * **Markdown Renderer**: Formats level-2 and level-3 headers, blockquotes, ordered/unordered lists, code snippets, and syntax blocks.
  * **Sticky Engagement Actions**: Animated Like button with live counter, Bookmark toggle, and One-click URL copy with animated toast notification.
  * **Recommendation Engine**: "You May Also Like" dynamically calculates and presents 3 related stories sharing categories and tags.
* **Interactive Community Discussions**:
  * Add comments with live character limit indicator (max 500 characters).
  * Reply threading with nested reply author tags.
  * Like individual comments.
  * Delete own comments with instant DOM cleanup.
* **Reading List / Bookmarks (`/bookmarks`)**:
  * One-tap save/remove with Framer Motion bounce physics.
  * Live bookmark count badge in global navigation.
  * Custom empty state with direct CTA to explore.

### ✍️ Editorial Management & CRUD
* **Author Dashboard (`/dashboard`)**:
  * Live analytical overview cards tracking *Total Posts*, *Published Stories*, *Drafts*, *Total Views*, and *Hearts Received*.
  * Filter tabs between *All*, *Published*, and *Drafts*.
  * Responsive layout converting from desktop data tables to compact stacked cards on tablet and mobile viewports.
  * Quick management actions: Public View, Edit, and Delete modal trigger.
* **Create Story Studio (`/create`)**:
  * **Strict Form Validation**: Enforces title (min 5 chars), subtitle, category, and substantive content (min 50 chars) with inline red alerts.
  * **Photography Selector**: Choose between curated high-resolution Unsplash presets, custom image URLs, or local image file upload previews.
  * **Interactive Tag Builder**: Add custom hashtags via Enter or comma; remove chips with click.
  * **Live Metadata**: Dynamically computes word count and estimated reading time as the author types.
  * **Dual Modes**: Save as private draft or publish directly to the live dispatch.
  * **Live Modal Preview**: View exact rendered article card and body before publishing.
* **Edit Story Studio (`/edit/:id`)**:
  * Pre-populates all existing story attributes.
  * Toggle publication status between *Draft* and *Published*.
  * Built-in permanent deletion flow guarded by an accessible confirmation modal.

### ⚡ Polish, UX & Micro-Interactions
* **Framer Motion Animations**: Tactile button presses, card hover elevation, spring-based heart pops, bookmark bounces, and slide-in toast notifications.
* **Comprehensive System States**:
  * Skeleton loader cards and article shells (`SkeletonCard`, `SkeletonArticle`).
  * Empty states for search queries, empty bookmarks, blank comments, and empty dashboard lists.
  * Visually compelling `404 Not Found` page and `Article Unavailable` fallback.
* **One-Click Reviewer Reset**: Built-in "Reset Demo Articles" button in the footer to restore the original 12 curated seed articles at any time during evaluation.

---

## 🛠️ Technology Stack

```
Frontend Architecture:
├── React 19.2 (Functional Components & Hooks)
├── Vite 8.3 (Blazing Fast Module Bundler & HMR)
├── React Router DOM 7.18 (Declarative Client-Side Routing)
├── Tailwind CSS 3.4 (Utility-First Design System)
├── Framer Motion 14.0 (Hardware-Accelerated Physics Animations)
├── Lucide React (Crisp, Accessible Vector Icons)
└── LocalStorage API (Reliable Client-Side Persistence)
```

---

## 📂 Project Architecture

```
GDG/
├── index.html                   # HTML entry point with DM Serif Display & Inter fonts
├── tailwind.config.js           # Theme configuration, typography & custom color tokens
├── postcss.config.js            # PostCSS pipeline
├── package.json                 # Project dependencies and script declarations
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # Application root DOM mount
    ├── App.jsx                  # Route definitions, global providers & layout shell
    ├── index.css                # Tailwind base layers, custom scrollbars & prose styling
    │
    ├── components/              # Modular, Reusable UI Components
    │   ├── BlogCard.jsx         # Card with hover zoom, tags, author & engagement
    │   ├── BlogGrid.jsx         # Responsive multi-column layout wrapper
    │   ├── BookmarkButton.jsx   # Animated bookmark toggle with spring physics
    │   ├── Button.jsx           # Editorial button with variant states
    │   ├── CategoryFilter.jsx   # Horizontal scrolling discipline pills
    │   ├── CommentItem.jsx      # Individual comment with replies, like & delete
    │   ├── CommentSection.jsx   # Comment composer, character counter & thread list
    │   ├── EmptyState.jsx       # Reusable graphic empty state with CTA
    │   ├── ErrorState.jsx       # Graceful error state with retry button
    │   ├── FeaturedCard.jsx     # Hero editorial card
    │   ├── Footer.jsx           # Platform footer, dispatch newsletter & reset action
    │   ├── LikeButton.jsx       # Spring-animated heart reaction with counter
    │   ├── Modal.jsx            # Accessible dialog with ESC listener & backdrop blur
    │   ├── Navbar.jsx           # Sticky nav with search modal, badges & mobile menu
    │   ├── ReadingProgress.jsx  # Pinned top scroll progress bar
    │   ├── SearchBar.jsx        # Debounced input with clear trigger
    │   └── SkeletonCard.jsx     # High-fidelity pulsing loading skeletons
    │
    ├── context/                 # Application State & Persistence
    │   ├── BlogContext.jsx      # Central CRUD store, comments, likes, bookmarks & stats
    │   └── ToastContext.jsx     # Floating animated notification toast provider
    │
    ├── data/
    │   └── initialBlogs.js      # 12 high-caliber, realistic editorial articles & categories
    │
    ├── hooks/
    │   ├── useDebounce.js       # Debounce hook for real-time search queries
    │   └── useLocalStorage.js   # Type-safe, fault-tolerant LocalStorage hook
    │
    ├── pages/                   # Application Route Pages
    │   ├── Home.jsx             # Hero, trending stories, discipline marquee & grid
    │   ├── Explore.jsx          # Discovery center with search, filter & sorting
    │   ├── BlogDetails.jsx      # Article reader, markdown renderer & recommendations
    │   ├── Category.jsx         # Specific discipline feed & banner
    │   ├── Search.jsx           # Dedicated search results page with keywords
    │   ├── Bookmarks.jsx        # Saved reading list
    │   ├── About.jsx            # Editorial manifesto & GDG task background
    │   ├── Dashboard.jsx        # Analytics counters & responsive article management
    │   ├── CreateBlog.jsx       # Story composer, validation, presets & live preview
    │   ├── EditBlog.jsx         # Story editor with delete modal
    │   └── NotFound.jsx         # Editorial 404 page
    │
    └── utils/
        ├── blogUtils.js         # Slug generation, reading time estimator & filters
        └── formatDate.js       # Formatting for ISO dates and relative times
```

---

## 🗺️ Application Routes

| Route | View | Description |
| :--- | :--- | :--- |
| **`/`** | Home | Hero featured story, latest dispatches, and curated editorial grid |
| **`/explore`** | Explore | Full catalog search, category pills, dynamic sorting, and live counts |
| **`/blog/:slug`** | Article Details | Reading experience with progress bar, comments, and related articles |
| **`/category/:category`** | Category View | Curated discipline banner, description, and filtered articles |
| **`/search`** | Search | Dedicated search page with query parameter synchronization |
| **`/bookmarks`** | Saved Stories | Reader's personal reading list with quick-remove |
| **`/about`** | About | Editorial manifesto and GDG recruitment background |
| **`/dashboard`** | Author Dashboard | Analytics metrics and story management (desktop table / mobile cards) |
| **`/create`** | Create Story | Form validator, photo presets, markdown editor, and preview modal |
| **`/edit/:id`** | Edit Story | Update existing stories or trigger delete confirmation modal |
| **`/404`** | Not Found | Minimalist editorial 404 page |

---

## 📱 Responsive Testing & Breakpoints

The application has been verified across all standard responsive form factors without horizontal overflow:
* **Mobile Small / Medium (375px – 414px)**: Stacked cards, sliding drawer navigation, compact typography, touch-friendly tap targets.
* **Tablet (768px – 1024px)**: 2-column balanced article grids, responsive dashboard metrics.
* **Desktop & Ultrawide (1280px – 1440px+)**: Multi-column editorial magazine grids, spacious reading containers, persistent desktop navigation.

---

## 💻 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or later (developed and verified on Node v24)
* **npm**: v9.0.0 or later

### Installation & Execution

```bash
# 1. Clone the repository
git clone https://github.com/HimanshuYadav5998/GDG.git

# 2. Change into project directory
cd GDG

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready for immediate deployment on Vercel, Netlify, or GitHub Pages.

---

## 👤 Author & Submission Details

* **Candidate**: Himanshu Yadav
* **Repository**: [https://github.com/HimanshuYadav5998/GDG.git](https://github.com/HimanshuYadav5998/GDG.git)
* **Target**: Google Developer Groups (GDG) Frontend Recruitment Evaluation
* **Status**: Production-Ready
