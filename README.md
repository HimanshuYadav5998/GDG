# Inkly — Modern Editorial Blog Platform

> **GDG Recruitment Frontend Development Task Submission**  
> Crafted by **Himanshu Yadav**  
> *Light Theme Only · Editorial Typography · Full LocalStorage Persistence · Production Quality*

---

## 1. Project Overview

**Inkly** is a production-quality, responsive editorial blog management platform designed with inspiration from modern typography-centric publications and photography-first compositions. It provides an intuitive, distraction-free reading experience alongside full author management capabilities.

---

## 2. Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (custom editorial palette, custom typography hierarchy, soft borders, and subtle shadows)
- **Typography**: Google Fonts — *DM Serif Display* (editorial headings) & *Inter* (body prose & UI)
- **Animations & Micro-interactions**: Framer Motion (page transitions, heart scaling, bookmark bounce, modals, animated toast alerts)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **State & Persistence**: React Context API + LocalStorage (`inkly_blogs`, `inkly_bookmarks`, `inkly_likes`, `inkly_comments`, `inkly_user`)

---

## 3. Design System Specifications

| Attribute | Specification |
| :--- | :--- |
| **Theme** | **Light Theme Only** (No dark mode) |
| **Primary Background** | `#FFFFFF` |
| **Secondary Background** | `#F7F7F5` (Warm editorial off-white/surface) |
| **Borders** | `#E8E8E5` |
| **Primary Text** | `#171717` |
| **Secondary Text** | `#666666` |
| **Muted Text** | `#999999` |
| **Accent Color** | `#FF5A36` (Warm terracotta/vermillion) |
| **Card Radius** | `12px` (`rounded-card`) |
| **Prose Max-Width** | `760px` (optimized line-height 1.85 for fatigue-free reading) |

---

## 4. Key Features & Functionality

### Public Reading Experience
1. **Hero & Editorial Layout**: Large featured article with subtle hover zoom and high-resolution Unsplash photography.
2. **Latest Stories & Editorial Grid**: Multi-column editorial grid showcasing category badges, author avatars, reading times, bookmark actions, and like counters.
3. **Explore / Discovery**:
   - Debounced real-time frontend search across title, excerpt, full markdown content, author, category, and tags.
   - Category filtering pills with dynamic counts.
   - Multi-option sorting (Latest, Most Popular, Most Liked, Bookmarked, Oldest).
4. **Blog Details / Reader View**:
   - Live scroll-driven **Reading Progress Bar** fixed at top.
   - Markdown-rendered article formatting (headings, quotes, lists, code blocks, paragraphs).
   - Share button (copies article URL to clipboard with animated toast notification).
   - Author profile card with biography and role.
   - "You May Also Like" recommendation engine showing 3 related posts based on shared category and tags.
5. **Interactive Comments**:
   - Post comments with character limit counter (500 chars).
   - Reply to comments with nested threading UI.
   - Like individual comments.
   - Delete own comments.
   - Persisted across page refreshes.
6. **Bookmarks & Reading List**:
   - Save/unsave articles with Framer Motion bounce.
   - Navbar counter badge reflecting current saved count.
   - Dedicated `/bookmarks` page with custom empty state.
7. **Likes & Reactions**:
   - Optimistic heart reaction animation with instant count update.
   - Persisted in localStorage.

### Author Management & Dashboard
1. **Editorial Dashboard (`/dashboard`)**:
   - Engagement overview: Total Stories, Published count, Drafts count, Total Views, Total Likes.
   - Tabbed view: *All*, *Published*, *Drafts*.
   - Responsive design: Converts from tabular data on desktop to clean stacked cards on mobile.
   - Quick actions: View public article, Edit, or Delete with confirmation modal.
2. **Create Story (`/create`)**:
   - Form validation: Title required (min 5 characters), Subtitle required, Category required, Content required (min 50 characters).
   - Unsplash photography preset selector + custom URL input + local image preview.
   - Tag builder chips (add on Enter/comma, remove with close icon).
   - Live estimated reading time and character counter.
   - Action buttons: *Save Draft*, *Modal Preview*, *Publish*.
3. **Edit Story (`/edit/:id`)**:
   - Pre-populates all existing data.
   - Update fields and toggle publication status.
   - Delete story with confirmation modal.
4. **Reset Demo Data**:
   - One-click reset button in footer to restore original curated 12 sample articles for easy evaluation.

---

## 5. Application Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | Home | Hero featured story, latest dispatches, and curated editorial grid |
| `/explore` | Explore | Search, category pills, sorting controls, and dynamic grid |
| `/blog/:slug` | Blog Details | Long-form reading experience with progress bar, comments, and related articles |
| `/category/:category` | Category Page | Curated discipline banner and filtered articles |
| `/search` | Search | Dedicated search page with query parameters and quick topics |
| `/bookmarks` | Bookmarks | Saved reading list |
| `/about` | About | Editorial manifesto and GDG recruitment background |
| `/dashboard` | Dashboard | Metrics summary and story management |
| `/create` | Create Blog | Story composer with validation, draft saving, and preview modal |
| `/edit/:id` | Edit Blog | Editor for modifying existing stories |
| `/404` | Not Found | 404 page for nonexistent routes |

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; developed on Node v24)
- npm

### Installation
```bash
# Clone the repository and navigate to the project directory
cd GDG

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Generates an optimized production bundle inside `dist/`.
