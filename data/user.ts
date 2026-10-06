export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  nextPayoutDate: string;
  payoutMethod: string;
}

export const user: UserProfile = {
  name: "Jordan Rivera",
  email: "jordan.rivera@example.com",
  memberSince: "2023-03-14",
  nextPayoutDate: "2026-10-15",
  payoutMethod: "Direct deposit (demo)",
};
