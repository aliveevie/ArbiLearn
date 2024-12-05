export interface User {
  id: number;
  name: string;
  rank: number;
  points: number;
  streak: number;
  badges: number;
  nfts: number;
  tokens: number;
  tasksCompleted: number;
  level: number;
}

export const currentUser: User = {
  id: 3,
  name: 'Charlie',
  rank: 3,
  points: 1100,
  streak: 3,
  badges: 3,
  nfts: 2,
  tokens: 500,
  tasksCompleted: 15,
  level: 4
};

export const leaderboardData: User[] = [
  { id: 1, name: 'Alice', rank: 1, points: 1200, streak: 7, badges: 5, nfts: 3, tokens: 600, tasksCompleted: 20, level: 5 },
  { id: 2, name: 'Bob', rank: 2, points: 1150, streak: 5, badges: 4, nfts: 2, tokens: 550, tasksCompleted: 18, level: 4 },
  { id: 3, name: 'Charlie', rank: 3, points: 1100, streak: 3, badges: 3, nfts: 2, tokens: 500, tasksCompleted: 15, level: 4 },
  { id: 4, name: 'David', rank: 4, points: 1050, streak: 4, badges: 3, nfts: 1, tokens: 450, tasksCompleted: 12, level: 3 },
  { id: 5, name: 'Eve', rank: 5, points: 1000, streak: 2, badges: 2, nfts: 1, tokens: 400, tasksCompleted: 10, level: 3 },
];

