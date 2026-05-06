import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./UI";

const links = [
  ["/", "Home"],
  ["/tutorials", "Free Tutorials"],
  ["/skill-library", "Skill Library"],
  ["/roadmaps", "Roadmaps"],
  ["/programs", "Programs"],
  ["/coaching", "Coaching"],
  ["/quiz", "Quiz"],
  ["/wall-of-fame", "Wall of Fame"],
  ["/dashboard", "Dashboard"],
  ["/coach", "Coach"],
  ["/students", "Students"],
  ["/checkout", "Checkout"],
];

export default function Layout({ children, onThemeNext, currentTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:rgba(8,11,17,0.55)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--panel)]">B</span>
            BTCALI
          </Link>
          <nav className="hidden gap-3 text-xs lg:flex">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-2 py-1 ${isActive ? "bg-[var(--accent-soft)]" : ""}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={onThemeNext} className="hidden sm:block text-xs">
              Change Theme: {currentTheme}
            </Button>
            <button className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs lg:hidden" onClick={() => setOpen((v) => !v)}>
              Menu
            </button>
          </div>
        </div>
        {open && (
          <div className="grid gap-1 border-t border-[var(--border)] p-3 lg:hidden">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm hover:bg-[var(--accent-soft)]">
                {label}
              </NavLink>
            ))}
            <Button onClick={onThemeNext} className="text-xs">
              Change Theme: {currentTheme}
            </Button>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 pb-24">{children}</main>
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--border)] bg-[var(--card)] p-2 lg:hidden">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[["/dashboard", "Dash"], ["/programs", "Programs"], ["/students", "Students"], ["/coach", "Coach"], ["/checkout", "Buy"]].map(([to, label]) => (
            <Link key={to} to={to} className="rounded-lg bg-[var(--panel)] px-2 py-2">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
