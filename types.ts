export type BeltRank = 'white' | 'gray' | 'blue' | 'purple' | 'brown' | 'black';

export interface HistoryMap {
  [dateISO: string]: number;
}

export interface AppState {
  treinosTotal: number;
  history: HistoryMap;
  goal: number;
  belt: BeltRank;
  stripes: number; // 0 to 4
  avatar?: string; // Base64 string of custom user image
}

export interface StatsRange {
  day: number;
  week: number;
  month: number;
}