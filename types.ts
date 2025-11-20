export type BeltRank = 'white' | 'gray' | 'blue' | 'purple' | 'brown' | 'black';

export interface HistoryMap {
  [dateISO: string]: number;
}

export interface AppState {
  treinosTotal: number;
  history: HistoryMap;
  goal: number;
  belt: BeltRank;
}

export interface StatsRange {
  day: number;
  week: number;
  month: number;
}
