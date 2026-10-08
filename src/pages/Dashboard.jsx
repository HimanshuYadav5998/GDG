import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PenSquare,
  FileText,
  Eye,
  Heart,
  Edit3,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useBlogs } from "../context/BlogContext";
import { formatDate } from "../utils/formatDate";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";

export function Dashboard() {
  const { blogs, deleteBlog, currentUser } = useBlogs();

  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'published' | 'draft'
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Statistics calculation
  const totalPosts = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  const totalLikes = blogs.reduce((acc, b) => acc + (b.likes || 0), 0);

  // Filtered stories by tab
  const filteredStories = blogs.filter((b) => {
    if (activeTab === "published") return b.status === "published";
    if (activeTab === "draft") return b.status === "draft";
    return true;
  });

  const confirmDelete = () => {
    if (blogToDelete) {
      deleteBlog(blogToDelete.id);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal leading-tight mb-1">
            Good morning, {currentUser.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-ink-secondary">
            Manage your publication stories, track readership engagement, and write new ideas.
          </p>
        </div>

        <Link to="/create">
          <Button variant="accent" className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Create New Story</span>
          </Button>
        </Link>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white border border-ink-border rounded-card shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            <span>Total Stories</span>
            <FileText className="w-4 h-4 text-ink-muted" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            {totalPosts}
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span>{publishedCount} published</span>
            <span>·</span>
            <span>{draftCount} drafts</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-ink-border rounded-card shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            <span>Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            {publishedCount}
          </p>
          <p className="text-xs text-ink-muted">Public in editorial dispatch</p>
        </div>

        <div className="p-5 bg-white border border-ink-border rounded-card shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            {totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews}
          </p>
          <p className="text-xs text-ink-muted">Reader impressions</p>
        </div>

        <div className="p-5 bg-white border border-ink-border rounded-card shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-secondary">
            <span>Appreciation</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl text-ink-primary font-normal">
            {totalLikes}
          </p>
          <p className="text-xs text-ink-muted">Hearts received</p>
        </div>
      </div>

      {/* Stories Management Section */}
      <div className="space-y-4">
        {/* Tabs & Table Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-ink-border">
          <h2 className="font-serif text-2xl text-ink-primary font-normal">
            Your Stories
          </h2>

          <div className="flex items-center gap-1.5 p-1 bg-ink-surface border border-ink-border rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-white text-ink-primary shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              All ({totalPosts})
            </button>
            <button
              onClick={() => setActiveTab("published")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "published"
                  ? "bg-white text-ink-primary shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "draft"
                  ? "bg-white text-ink-primary shadow-sm font-semibold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Stories Listing */}
        {filteredStories.length === 0 ? (
          <EmptyState
            icon="file"
            title="You haven't created any stories in this section yet."
            description="Start writing a new draft or publish an article to build your editorial archive."
            actionLabel="Write New Story"
            actionLink="/create"
          />
        ) : (
          <div>
            {/* Desktop Table View (≥ 768px) */}
            <div className="hidden md:block overflow-x-auto bg-white border border-ink-border rounded-card shadow-subtle">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink-border bg-ink-surface/50 text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
                    <th className="py-3.5 px-6">Story Title</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4">Likes</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-border text-sm">
                  {filteredStories.map((story) => (
                    <tr key={story.id} className="hover:bg-ink-surface/30 transition-colors">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={story.coverImage}
                            alt=""
                            className="w-10 h-10 rounded object-cover flex-shrink-0 bg-ink-surface"
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/blog/${story.slug}`}
                              className="font-medium text-ink-primary hover:text-ink-accent line-clamp-1 block"
                            >
                              {story.title}
                            </Link>
                            <span className="text-xs text-ink-muted line-clamp-1">
                              {story.readingTime}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase ${
                            story.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {story.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-ink-secondary whitespace-nowrap">
                        {story.category}
                      </td>

                      <td className="py-4 px-4 text-xs text-ink-secondary tabular-nums">
                        {story.views || 0}
                      </td>

                      <td className="py-4 px-4 text-xs text-ink-secondary tabular-nums">
                        {story.likes || 0}
                      </td>

                      <td className="py-4 px-4 text-xs text-ink-muted whitespace-nowrap">
                        {formatDate(story.publishedAt)}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/blog/${story.slug}`}
                            className="p-1.5 text-ink-muted hover:text-ink-primary hover:bg-ink-surface rounded transition-colors"
                            title="View Story"
                            aria-label={`View story ${story.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/edit/${story.id}`}
                            className="p-1.5 text-ink-muted hover:text-ink-primary hover:bg-ink-surface rounded transition-colors"
                            title="Edit Story"
                            aria-label={`Edit story ${story.title}`}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setBlogToDelete(story)}
                            className="p-1.5 text-ink-muted hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Story"
                            aria-label={`Delete story ${story.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View (< 768px) */}
            <div className="md:hidden space-y-3">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="p-4 bg-white border border-ink-border rounded-card space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={story.coverImage}
                      alt=""
                      className="w-14 h-14 rounded-md object-cover flex-shrink-0 bg-ink-surface"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            story.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {story.status}
                        </span>
                        <span className="text-[11px] text-ink-muted truncate">
                          {story.category}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${story.slug}`}
                        className="font-medium text-sm text-ink-primary line-clamp-2"
                      >
                        {story.title}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-ink-border text-xs text-ink-muted">
                    <div className="flex items-center gap-3">
                      <span>{story.views || 0} views</span>
                      <span>·</span>
                      <span>{story.likes || 0} likes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/edit/${story.id}`}
                        className="px-2.5 py-1 text-xs font-medium text-ink-primary bg-ink-surface border border-ink-border rounded hover:bg-[#EBEBE8]"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setBlogToDelete(story)}
                        className="p-1 text-ink-muted hover:text-red-600 rounded"
                        aria-label="Delete story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deletion Confirmation Modal */}
      <Modal
        isOpen={Boolean(blogToDelete)}
        onClose={() => setBlogToDelete(null)}
        title="Delete Story"
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-secondary leading-relaxed">
            Are you sure you want to delete{" "}
            <strong className="text-ink-primary">"{blogToDelete?.title}"</strong>? This action cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-border">
            <Button
              variant="secondary"
              onClick={() => setBlogToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
