import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { CommentItem } from "./CommentItem";
import { Button } from "./Button";
import { useBlogs } from "../context/BlogContext";

export function CommentSection({ blogId }) {
  const { comments, addComment, currentUser } = useBlogs();
  const [commentText, setCommentText] = useState("");

  const postComments = comments[blogId] || [];
  const maxChars = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(blogId, commentText);
    setCommentText("");
  };

  return (
    <section className="pt-10 border-t border-ink-border mt-12" id="comments">
      <div className="flex items-center gap-2.5 mb-8">
        <MessageSquare className="w-5 h-5 text-ink-primary" />
        <h3 className="font-serif text-2xl font-normal text-ink-primary">
          Comments ({postComments.length})
        </h3>
      </div>

      {/* New Comment Box */}
      <form onSubmit={handleSubmit} className="mb-10 bg-white border border-ink-border rounded-card p-4 sm:p-5 shadow-subtle">
        <div className="flex items-start gap-3 mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-ink-border flex-shrink-0 mt-1"
          />
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a thoughtful comment..."
              rows={3}
              maxLength={maxChars}
              className="w-full text-sm bg-transparent border-0 resize-none text-ink-primary placeholder:text-ink-muted focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-ink-border/70 text-xs text-ink-muted">
          <span>
            {commentText.length}/{maxChars} characters
          </span>
          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={!commentText.trim()}
            className="gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Comment</span>
          </Button>
        </div>
      </form>

      {/* Comment List or Empty State */}
      {postComments.length === 0 ? (
        <div className="py-12 text-center bg-ink-surface/50 border border-dashed border-ink-border rounded-card">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-ink-muted stroke-[1.5]" />
          <p className="text-sm font-medium text-ink-primary mb-1">
            No comments yet
          </p>
          <p className="text-xs text-ink-secondary">
            Be the first to share your thoughts and perspectives.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-ink-border/70">
          {postComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              blogId={blogId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
