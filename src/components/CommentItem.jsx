import React, { useState } from "react";
import { Heart, Reply, Trash2, CornerDownRight } from "lucide-react";
import { formatTimeAgo } from "../utils/formatDate";
import { Button } from "./Button";
import { useBlogs } from "../context/BlogContext";

export function CommentItem({ comment, blogId, isReply = false }) {
  const { toggleLikeComment, deleteComment, addReply, currentUser } = useBlogs();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addReply(blogId, comment.id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const isAuthor = comment.author?.name === currentUser.name;

  return (
    <div className={`group ${isReply ? "mt-4 pl-4 border-l-2 border-ink-border" : "py-5 border-b border-ink-border/70 last:border-b-0"}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <img
            src={comment.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
            alt={comment.author?.name}
            className="w-7 h-7 rounded-full object-cover border border-ink-border flex-shrink-0"
          />
          <div>
            <h5 className="text-xs font-semibold text-ink-primary">
              {comment.author?.name}
            </h5>
            <span className="text-[11px] text-ink-muted">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
        </div>

        {isAuthor && !isReply && (
          <button
            onClick={() => deleteComment(blogId, comment.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-ink-muted hover:text-red-600 transition-all rounded"
            title="Delete comment"
            aria-label="Delete comment"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <p className="text-sm text-ink-primary leading-relaxed pl-9 mb-3">
        {comment.content}
      </p>

      {/* Actions */}
      <div className="pl-9 flex items-center gap-4 text-xs text-ink-secondary">
        <button
          onClick={() => toggleLikeComment(blogId, comment.id)}
          className={`inline-flex items-center gap-1.5 transition-colors ${
            comment.liked ? "text-red-600 font-semibold" : "hover:text-ink-primary"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${comment.liked ? "fill-current" : ""}`} />
          <span>{comment.likes || 0}</span>
        </button>

        {!isReply && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="inline-flex items-center gap-1.5 hover:text-ink-primary transition-colors"
          >
            <Reply className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        )}
      </div>

      {/* Reply input */}
      {showReplyForm && (
        <form onSubmit={handleSendReply} className="mt-3 pl-9">
          <div className="relative">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.author?.name}...`}
              maxLength={280}
              autoFocus
              className="w-full text-xs bg-ink-surface border border-ink-border rounded-lg px-3 py-2 pr-20 text-ink-primary focus:outline-none focus:border-ink-primary"
            />
            <div className="absolute right-1 top-1 flex items-center gap-1">
              <Button type="submit" size="sm" variant="primary" disabled={!replyText.trim()}>
                Reply
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              blogId={blogId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
