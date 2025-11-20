export function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function weekOf(dateISO: string): string {
  const d = new Date(dateISO);
  const start = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday first
  start.setDate(diff);
  return start.toISOString().slice(0, 10);
}

export function monthOf(dateISO: string): string {
  return dateISO.slice(0, 7); // YYYY-MM
}

export function formatDateBr(dateISO: string): string {
  const [y, m, d] = dateISO.split('-');
  return `${d}/${m}`;
}
