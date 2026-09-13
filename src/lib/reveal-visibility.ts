/**
 * One rule for "is this worth animating yet?".
 *
 * A reveal should not play while the visitor is still looking at the previous
 * section, and a tall visual should not finish its story before its lower half
 * has scrolled in. Both are the same question: how much of the element has to
 * be on screen before we start.
 *
 * The reveal has to start while the element is already visible, or the visitor
 * watches an empty band where the heading should be and reads that as "nothing
 * is happening". It also has to clear the bottom edge by enough that the motion
 * isn't over before the eye arrives. Roughly 40% of the element, bounded so tiny
 * elements aren't asked to fill the screen and tall ones aren't asked to wait.
 */
export function revealTargetPx(height: number, viewportHeight: number) {
  if (!Number.isFinite(height) || !Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return 0;
  }

  const byElement = height * 0.4;
  const floor = viewportHeight * 0.08;
  const ceiling = viewportHeight * 0.32;

  return Math.min(Math.max(byElement, floor), ceiling);
}

/**
 * The `start` value for a GSAP ScrollTrigger: the share of the viewport the
 * element's top should reach once enough of it is visible.
 */
export function revealStart(height: number, viewportHeight: number) {
  const target = revealTargetPx(height, viewportHeight);
  const topWhenReady = viewportHeight - target;
  const percent = Math.round((topWhenReady / viewportHeight) * 100);

  return `top ${Math.min(94, Math.max(20, percent))}%`;
}
