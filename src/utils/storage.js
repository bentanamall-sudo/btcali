export const keys = {
  tutorials: "btcali-tutorials-complete",
  roadmap: "btcali-roadmap-complete",
  dashboard: "btcali-dashboard-state",
  students: "btcali-students-data",
  programs: "btcali-student-programs",
  notes: "btcali-private-notes",
  checkins: "btcali-checkins",
};

export function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
