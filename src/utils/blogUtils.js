export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function calculateReadingTime(text) {
  if (!text) return "1 min read";
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export function filterAndSortBlogs(blogs, { search = "", category = "all", sort = "latest", bookmarkedIds = [] }) {
  if (!Array.isArray(blogs)) return [];

  let results = [...blogs];

  // Only published blogs in public listings unless specified
  results = results.filter(blog => blog.status === "published");

  // Category filter
  if (category && category.toLowerCase() !== "all") {
    const targetCat = category.toLowerCase().replace(/-/g, " ");
    results = results.filter(
      blog => blog.category.toLowerCase().replace(/-/g, " ") === targetCat
    );
  }

  // Search filter (searches across title, excerpt, content, author, category, tags)
  if (search && search.trim() !== "") {
    const q = search.trim().toLowerCase();
    results = results.filter(blog => {
      const titleMatch = blog.title?.toLowerCase().includes(q);
      const excerptMatch = blog.excerpt?.toLowerCase().includes(q);
      const contentMatch = blog.content?.toLowerCase().includes(q);
      const authorMatch = blog.author?.name?.toLowerCase().includes(q);
      const categoryMatch = blog.category?.toLowerCase().includes(q);
      const tagMatch = blog.tags?.some(tag => tag.toLowerCase().includes(q));
      return titleMatch || excerptMatch || contentMatch || authorMatch || categoryMatch || tagMatch;
    });
  }

  // Sorting
  switch (sort) {
    case "popular":
    case "most-popular":
      results.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case "liked":
    case "most-liked":
      results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      break;
    case "bookmarked":
    case "most-bookmarked":
      results.sort((a, b) => {
        const isBBookmarked = bookmarkedIds.includes(b.id) ? 1 : 0;
        const isABookmarked = bookmarkedIds.includes(a.id) ? 1 : 0;
        return isBBookmarked - isABookmarked;
      });
      break;
    case "oldest":
      results.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      break;
    case "latest":
    default:
      results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      break;
  }

  return results;
}

export function getRelatedBlogs(blogs, currentBlog, limit = 3) {
  if (!currentBlog || !Array.isArray(blogs)) return [];
  return blogs
    .filter(b => b.id !== currentBlog.id && b.status === "published")
    .map(b => {
      let score = 0;
      if (b.category.toLowerCase() === currentBlog.category.toLowerCase()) {
        score += 3;
      }
      const sharedTags = (b.tags || []).filter(t => (currentBlog.tags || []).includes(t));
      score += sharedTags.length * 2;
      return { blog: b, score };
    })
    .sort((a, b) => b.score - a.score || (b.blog.likes || 0) - (a.blog.likes || 0))
    .slice(0, limit)
    .map(item => item.blog);
}
