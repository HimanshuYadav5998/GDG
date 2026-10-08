import React, { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_BLOGS, INITIAL_COMMENTS } from "../data/initialBlogs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";
import { slugify, calculateReadingTime } from "../utils/blogUtils";

const BlogContext = createContext(null);

const DEFAULT_USER = {
  name: "Himanshu Yadav",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  bio: "Lead Systems Architect & editorial contributor at Inkly.",
  role: "Lead Systems Architect"
};

export function BlogProvider({ children }) {
  const { showToast } = useToast();

  const [blogs, setBlogs] = useLocalStorage("inkly_blogs", INITIAL_BLOGS);
  const [bookmarks, setBookmarks] = useLocalStorage("inkly_bookmarks", ["post-1", "post-2"]);
  const [likedPosts, setLikedPosts] = useLocalStorage("inkly_liked_posts", ["post-2"]);
  const [comments, setComments] = useLocalStorage("inkly_comments", INITIAL_COMMENTS);
  const [currentUser] = useLocalStorage("inkly_user", DEFAULT_USER);

  // Helper to get a blog by slug or ID
  const getBlogBySlug = (slugOrId) => {
    if (!slugOrId) return null;
    return (
      blogs.find(
        (b) => b.slug === slugOrId || b.id === slugOrId
      ) || null
    );
  };

  // Create new blog
  const createBlog = (blogData) => {
    const title = blogData.title.trim();
    const baseSlug = slugify(title) || `story-${Date.now()}`;
    // ensure unique slug
    let finalSlug = baseSlug;
    let counter = 1;
    while (blogs.some((b) => b.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const readingTime = calculateReadingTime(blogData.content || "");
    const newBlog = {
      id: `post-${Date.now()}`,
      title,
      slug: finalSlug,
      excerpt: blogData.excerpt?.trim() || blogData.subtitle?.trim() || blogData.content.substring(0, 160) + "...",
      content: blogData.content,
      coverImage: blogData.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
      category: blogData.category || "Technology",
      tags: blogData.tags || ["Article"],
      author: blogData.author || currentUser,
      publishedAt: new Date().toISOString(),
      readingTime,
      likes: 0,
      views: 0,
      status: blogData.status || "published",
      featured: false
    };

    setBlogs((prev) => [newBlog, ...prev]);

    if (newBlog.status === "published") {
      showToast("Story published successfully!");
    } else {
      showToast("Draft saved successfully!", "info");
    }

    return newBlog;
  };

  // Update existing blog
  const updateBlog = (id, updatedFields) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;

        const updatedContent = updatedFields.content !== undefined ? updatedFields.content : b.content;
        const updatedTitle = updatedFields.title !== undefined ? updatedFields.title.trim() : b.title;
        let finalSlug = b.slug;

        // If title changed, update slug safely
        if (updatedFields.title && updatedFields.title !== b.title) {
          const baseSlug = slugify(updatedTitle);
          finalSlug = baseSlug;
          let counter = 1;
          while (prev.some((other) => other.id !== id && other.slug === finalSlug)) {
            finalSlug = `${baseSlug}-${counter}`;
            counter++;
          }
        }

        return {
          ...b,
          ...updatedFields,
          title: updatedTitle,
          slug: finalSlug,
          excerpt: updatedFields.excerpt || updatedFields.subtitle || b.excerpt,
          readingTime: calculateReadingTime(updatedContent),
          updatedAt: new Date().toISOString()
        };
      })
    );

    showToast("Changes saved successfully!");
  };

  // Delete blog
  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    // Remove from bookmarks
    setBookmarks((prev) => prev.filter((bId) => bId !== id));
    // Remove from liked
    setLikedPosts((prev) => prev.filter((bId) => bId !== id));

    showToast(`"${blogToDelete?.title?.slice(0, 24) || "Story"}..." deleted`, "info");
  };

  // Toggle Bookmark
  const toggleBookmark = (id) => {
    const isBookmarked = bookmarks.includes(id);
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((bId) => bId !== id));
      showToast("Removed from bookmarks");
    } else {
      setBookmarks((prev) => [...prev, id]);
      showToast("Added to bookmarks");
    }
  };

  // Toggle Like
  const toggleLike = (id) => {
    const isLiked = likedPosts.includes(id);

    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const currentLikes = b.likes || 0;
          return {
            ...b,
            likes: isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1
          };
        }
        return b;
      })
    );

    if (isLiked) {
      setLikedPosts((prev) => prev.filter((pId) => pId !== id));
    } else {
      setLikedPosts((prev) => [...prev, id]);
    }
  };

  // Increment views
  const incrementViews = (id) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, views: (b.views || 0) + 1 } : b))
    );
  };

  // Add Comment
  const addComment = (blogId, content) => {
    if (!content || !content.trim()) return;

    const newComment = {
      id: `comm-${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };

    setComments((prev) => ({
      ...prev,
      [blogId]: [newComment, ...(prev[blogId] || [])]
    }));

    showToast("Comment posted!");
  };

  // Add Reply
  const addReply = (blogId, commentId, replyContent) => {
    if (!replyContent || !replyContent.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false
    };

    setComments((prev) => {
      const blogComments = prev[blogId] || [];
      const updated = blogComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply]
          };
        }
        return c;
      });
      return { ...prev, [blogId]: updated };
    });

    showToast("Reply posted!");
  };

  // Delete Comment
  const deleteComment = (blogId, commentId) => {
    setComments((prev) => {
      const blogComments = prev[blogId] || [];
      const updated = blogComments.filter((c) => c.id !== commentId);
      return { ...prev, [blogId]: updated };
    });
    showToast("Comment removed", "info");
  };

  // Like comment
  const toggleLikeComment = (blogId, commentId) => {
    setComments((prev) => {
      const blogComments = prev[blogId] || [];
      const updated = blogComments.map((c) => {
        if (c.id === commentId) {
          const isLiked = c.liked;
          return {
            ...c,
            liked: !isLiked,
            likes: isLiked ? Math.max(0, (c.likes || 1) - 1) : (c.likes || 0) + 1
          };
        }
        return c;
      });
      return { ...prev, [blogId]: updated };
    });
  };

  // Reset to initial sample data
  const resetToSampleData = () => {
    setBlogs(INITIAL_BLOGS);
    setComments(INITIAL_COMMENTS);
    setBookmarks(["post-1", "post-2"]);
    setLikedPosts(["post-2"]);
    showToast("Reset to sample editorial articles!");
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        bookmarks,
        likedPosts,
        comments,
        currentUser,
        getBlogBySlug,
        createBlog,
        updateBlog,
        deleteBlog,
        toggleBookmark,
        toggleLike,
        incrementViews,
        addComment,
        addReply,
        deleteComment,
        toggleLikeComment,
        resetToSampleData
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}
