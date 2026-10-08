// The blog motion flag lives on <html data-blog-motion>:
//   pending   the head script (blog routes only) hides entrance content until hydration
//   active    hydration ran and entrance motion is armed
//   fallback  the head timer gave up waiting for hydration, so content was released
// The head script in layout.tsx sets pending and fallback. Everything else lives here.

export function prepareBlogMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  // A fallback page is already readable. Re-hiding it here would flicker it.
  if (root.dataset.blogMotion !== "fallback") root.dataset.blogMotion = "pending";
}

export function activateBlogMotion() {
  const root = document.documentElement;
  if (root.dataset.blogMotion === "pending") root.dataset.blogMotion = "active";
}

// Returns true once if the head timer released this page before hydration finished.
// The caller then skips the entrance, since arming now would hide readable content.
// Flipping to "active" lets later client navigations animate normally.
export function takeBlogMotionFallback() {
  const root = document.documentElement;
  if (root.dataset.blogMotion !== "fallback") return false;
  root.dataset.blogMotion = "active";
  return true;
}
