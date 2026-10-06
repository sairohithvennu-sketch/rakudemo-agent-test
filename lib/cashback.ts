/** Cashback earned on a purchase, rounded to the nearest cent. */
export function calculateCashback(amount: number, ratePercent: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(ratePercent)) return 0;
  if (amount <= 0 || ratePercent <= 0) return 0;
  return Math.round(amount * ratePercent) / 100;
}
