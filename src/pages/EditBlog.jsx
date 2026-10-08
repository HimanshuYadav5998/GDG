import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Image as ImageIcon,
  Plus,
  X,
  Trash2,
  Save,
  ArrowLeft
} from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { CATEGORIES } from "../data/initialBlogs";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { calculateReadingTime } from "../utils/blogUtils";
import { EmptyState } from "../components/EmptyState";

export function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, updateBlog, deleteBlog } = useBlogs();

  const blog = blogs.find((b) => b.id === id || b.slug === id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Prepopulate form on mount or blog change
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSubtitle(blog.excerpt || "");
      setCoverImage(blog.coverImage || "");
      setCategory(blog.category || "Technology");
      setTags(blog.tags || []);
      setContent(blog.content || "");
      setStatus(blog.status || "published");
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <EmptyState
          icon="file"
          title="Story Not Found"
          description="The story you are trying to edit does not exist or may have been deleted."
          actionLabel="Back to Dashboard"
          actionLink="/dashboard"
        />
      </div>
    );
  }

  // Tag addition
  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, "");
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    }

    if (!subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required.";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required.";
    } else if (content.trim().length < 50) {
      newErrors.content = `Content must be at least 50 characters (currently ${content.trim().length}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    updateBlog(blog.id, {
      title,
      subtitle,
      excerpt: subtitle,
      coverImage,
      category,
      tags,
      content,
      status
    });

    navigate(`/blog/${blog.slug}`);
  };

  // Delete article
  const handleDelete = () => {
    deleteBlog(blog.id);
    setShowDeleteModal(false);
    navigate("/dashboard");
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            className="gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Article</span>
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={handleSaveChanges}
            className="gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSaveChanges} className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-ink-accent block mb-2">
            Story Editor
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            Edit Article
          </h1>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
            }}
            className={`w-full px-4 py-3 text-lg font-serif bg-white border rounded-lg text-ink-primary focus:outline-none focus:ring-1 ${
              errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-ink-border focus:border-ink-primary focus:ring-ink-primary"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>
          )}
        </div>

        {/* Subtitle / Excerpt */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
            Subtitle / Summary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => {
              setSubtitle(e.target.value);
              if (errors.subtitle) setErrors((prev) => ({ ...prev, subtitle: null }));
            }}
            className={`w-full px-4 py-2.5 text-sm bg-white border rounded-lg text-ink-primary focus:outline-none focus:ring-1 ${
              errors.subtitle
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-ink-border focus:border-ink-primary focus:ring-ink-primary"
            }`}
          />
          {errors.subtitle && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.subtitle}</p>
          )}
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border border-ink-border rounded-lg text-ink-primary focus:outline-none focus:border-ink-primary"
            >
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border border-ink-border rounded-lg text-ink-primary focus:outline-none focus:border-ink-primary"
            >
              <option value="published">Published (Public)</option>
              <option value="draft">Draft (Private)</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
            Tags (Press Enter or comma to add)
          </label>
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-ink-border rounded-lg min-h-[42px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-ink-surface text-ink-primary border border-ink-border"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag..."
              className="flex-1 min-w-[100px] text-xs bg-transparent border-none p-1 focus:outline-none text-ink-primary"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
            Cover Photography URL
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-full sm:w-48 aspect-[16/10] rounded-lg overflow-hidden border border-ink-border bg-ink-surface flex-shrink-0">
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Cover image URL..."
              className="w-full px-3 py-2 text-xs bg-white border border-ink-border rounded-lg text-ink-primary focus:outline-none focus:border-ink-primary"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1.5 pt-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
              Article Content (Markdown supported) <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-ink-muted">
              {content.length} chars · ~{readingTime}
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
            }}
            rows={14}
            className={`w-full p-4 font-mono text-sm leading-relaxed bg-white border rounded-lg text-ink-primary focus:outline-none focus:ring-1 ${
              errors.content
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-ink-border focus:border-ink-primary focus:ring-ink-primary"
            }`}
          />
          {errors.content && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.content}</p>
          )}
        </div>

        {/* Bottom Submission Toolbar */}
        <div className="pt-6 border-t border-ink-border flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Article
          </Button>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Article"
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-secondary leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <strong className="text-ink-primary">"{blog.title}"</strong>? This will remove all associated comments and bookmarks.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-border">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
