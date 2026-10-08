export function formatDate(isoString) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return isoString;
  }
}

export function formatTimeAgo(isoString) {
  if (!isoString) return "";
  try {
    const now = new Date();
    const past = new Date(isoString);
    const diffInSec = Math.floor((now - past) / 1000);

    if (diffInSec < 60) return "just now";
    const diffInMin = Math.floor(diffInSec / 60);
    if (diffInMin < 60) return `${diffInMin}m ago`;
    const diffInHours = Math.floor(diffInMin / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return formatDate(isoString);
  } catch {
    return isoString;
  }
}
