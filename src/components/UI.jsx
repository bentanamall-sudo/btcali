import { motion } from "framer-motion";
import { VideoPlayer } from "./VideoPlayer";

export function Card({ className = "", children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:shadow-glow ${className}`}
    >
      {children}
    </button>
  );
}

export function ImagePlaceholder({ label = "Replace with your own image" }) {
  return (
    <div className="relative h-36 w-full rounded-2xl border border-dashed border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="absolute inset-0 grid place-items-center text-center text-xs text-[var(--muted)]">
        {label}
      </div>
    </div>
  );
}

export function VideoPlaceholder({ label = "Replace with your own video" }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="grid h-32 place-items-center rounded-xl border border-dashed border-[var(--border)] text-[var(--muted)]">
        Play Video
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs text-[var(--muted)]">{label}</span>
        <Button className="px-3 py-1 text-xs">Upload / Replace</Button>
      </div>
    </div>
  );
}

export { VideoPlayer };
