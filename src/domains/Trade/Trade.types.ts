export const LONG = 'LONG';
export const SHORT = 'SHORT';

export type PositionType = typeof LONG | typeof SHORT;

export interface Trade {
  id: string;
  coin?: string;
  dateTime?: string;
  openPrice?: number;
  closePrice?: number; // undefined if not closed
  leverage?: number;
  positionSize?: number;
  type?: PositionType;
  notes?: string;
}
