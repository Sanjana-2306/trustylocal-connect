const BASE_SCORE = 50;

export interface WorkerStats {
  completed_jobs: number;
  four_plus_ratings: number;
  repeat_customers: number;
  complaints: number;
  severe_complaints: number;
}

export function calculateTrustScore(stats: WorkerStats): number {
  let score = BASE_SCORE;
  score += stats.completed_jobs * 10;
  score += stats.four_plus_ratings * 5;
  score += stats.repeat_customers * 8;
  score -= stats.complaints * 20;
  score -= stats.severe_complaints * 30;
  return Math.max(0, Math.min(100, score));
}

export type TrustLevel = "Under Review" | "Verified" | "Elite";

export function getTrustLevel(score: number): TrustLevel {
  if (score < 50) return "Under Review";
  if (score < 75) return "Verified";
  return "Elite";
}

export function canAppearInSearch(score: number): boolean {
  return score >= 70;
}

export function shouldAutoSuspend(complaints: number): boolean {
  return complaints >= 3;
}
