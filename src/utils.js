const COLORS = ["#4f46e5","#0891b2","#059669","#d97706","#db2777","#7c3aed","#2563eb","#dc2626"];

export function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

export function initials(name) {
  return name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const KEY = "scoreboard_v1";

export function loadStudents() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveStudents(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}
