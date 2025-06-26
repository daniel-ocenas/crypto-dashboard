import { LONG, PositionType } from '@/domains/Trade/Trade.types';

export function calculatePnLFromSize(open: number, current: number, positionSize: number, type: PositionType): number {
  const priceDiff = type === LONG ? current - open : open - current;
  const pnl = positionSize * (priceDiff / open);

  return parseFloat(pnl.toFixed(2));
}
