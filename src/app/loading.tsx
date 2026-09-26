export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
      <div
        role="status"
        aria-label="Loading"
        className="size-8 animate-spin rounded-full motion-reduce:animate-none border-2 border-border border-t-accent"
      />
    </div>
  );
}
