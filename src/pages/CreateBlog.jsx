import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Image as ImageIcon,
  Plus,
  X,
  Eye,
  Send,
  FileCheck,
  ArrowLeft
} from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { CATEGORIES } from "../data/initialBlogs";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { calculateReadingTime } from "../utils/blogUtils";

// High quality curated Unsplash photography presets
const COVER_PRESETS = [
  {
    name: "Minimalist Workspace",
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Architectural Studio",
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Abstract Neon Silicon",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Engineering Terminal",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    name: "Typography Craft",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80"
  }
];

export function CreateBlog() {
  const navigate = useNavigate();
  const { createBlog, currentUser } = useBlogs();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0].url);
  const [category, setCategory] = useState("Technology");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["WebDevelopment", "Design"]);
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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

  // Form validation
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

    if (!category) {
      newErrors.category = "Category is required.";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required.";
    } else if (content.trim().length < 50) {
      newErrors.content = `Content must be at least 50 characters (currently ${content.trim().length}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save Draft
  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrors({ title: "Draft requires at least a title." });
      return;
    }

    createBlog({
      title,
      subtitle: subtitle || "Untitled Draft Excerpt",
      coverImage,
      category,
      tags,
      content: content || "Draft in progress...",
      status: "draft"
    });

    navigate("/dashboard");
  };

  // Handle Publish
  const handlePublish = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBlog = createBlog({
      title,
      subtitle,
      coverImage,
      category,
      tags,
      content,
      status: "published"
    });

    navigate(`/blog/${newBlog.slug}`);
  };

  // Handle image upload from computer (creates Data URL preview)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Top Bar with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreviewModal(true)}
            className="gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveDraft}
            className="gap-1.5"
          >
            <FileCheck className="w-4 h-4" />
            <span>Save Draft</span>
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={handlePublish}
            className="gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Publish Story</span>
          </Button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handlePublish} className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-ink-accent block mb-2">
            New Editorial Story
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            Compose a Story
          </h1>
        </div>

        {/* Title Field */}
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
            placeholder="e.g. The Architecture of Calm: Designing for Human Focus"
            className={`w-full px-4 py-3 text-lg font-serif bg-white border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 ${
              errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-ink-border focus:border-ink-primary focus:ring-ink-primary"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>
          )}
        </div>

        {/* Subtitle / Excerpt Field */}
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
            placeholder="A short, evocative description that appears on cards and search results..."
            className={`w-full px-4 py-2.5 text-sm bg-white border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 ${
              errors.subtitle
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-ink-border focus:border-ink-primary focus:ring-ink-primary"
            }`}
          />
          {errors.subtitle && (
            <p className="text-xs text-red-600 mt-1 font-medium">{errors.subtitle}</p>
          )}
        </div>

        {/* Category & Cover Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border border-ink-border rounded-lg text-ink-primary focus:outline-none focus:border-ink-primary focus:ring-1 focus:ring-ink-primary"
            >
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Builder */}
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
                placeholder={tags.length === 0 ? "e.g. React, UX, Architecture" : "Add tag..."}
                className="flex-1 min-w-[100px] text-xs bg-transparent border-none p-1 focus:outline-none text-ink-primary"
              />
            </div>
          </div>
        </div>

        {/* Cover Image Selector */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
            Cover Photography
          </label>

          {/* Image preview & custom URL */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-full sm:w-48 aspect-[16/10] rounded-lg overflow-hidden border border-ink-border bg-ink-surface flex-shrink-0">
              <img
                src={coverImage}
                alt="Selected cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 w-full space-y-3">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Or paste an image URL (Unsplash, etc.)..."
                className="w-full px-3 py-2 text-xs bg-white border border-ink-border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary"
              />

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-surface border border-ink-border hover:bg-[#EBEBE8] rounded text-xs font-medium cursor-pointer text-ink-primary transition-colors">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Upload local file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-ink-muted">
                  Or select a preset below:
                </span>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {COVER_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setCoverImage(preset.url)}
                    className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                      coverImage === preset.url
                        ? "bg-ink-primary text-white border-ink-primary"
                        : "bg-white text-ink-secondary border-ink-border hover:border-ink-primary"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Editor */}
        <div className="space-y-1.5 pt-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-primary">
              Article Content (Markdown supported) <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-ink-muted">
              {content.length} chars · ~{readingTime}
            </span>
          </div>

          <p className="text-xs text-ink-muted">
            Format your story using <code>## Heading 2</code>, <code>### Heading 3</code>, <code>&gt; Blockquotes</code>, <code>* Lists</code>, or <code>``` Code blocks</code>.
          </p>

          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
            }}
            placeholder="Write your story here with deliberate focus...

## Introduction
Start with a compelling premise...

> A thoughtful quote anchors the thesis.

### Key Insights
* First observation
* Second observation"
            rows={14}
            className={`w-full p-4 font-mono text-sm leading-relaxed bg-white border rounded-lg text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 ${
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
        <div className="pt-6 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            By publishing, your story will appear across the public dispatch and explore directory.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-none"
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="accent"
              className="flex-1 sm:flex-none"
            >
              Publish Story
            </Button>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Article Preview"
        maxWidth="max-w-3xl"
      >
        <div className="max-h-[75vh] overflow-y-auto space-y-6 pr-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-ink-accent">
              {category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-primary mt-1 mb-2 font-normal">
              {title || "Untitled Story"}
            </h2>
            <p className="text-sm text-ink-secondary">{subtitle || "No subtitle provided."}</p>
          </div>

          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-ink-surface">
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
          </div>

          <div className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
            {content || "No content entered yet."}
          </div>

          <div className="pt-4 border-t border-ink-border flex justify-end">
            <Button variant="primary" onClick={() => setShowPreviewModal(false)}>
              Close Preview
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
