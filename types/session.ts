export type Session = {
  id: number;
  date: string; // 開催日
  location: string; // 開催場所
  participants: string[]; // 参加ユーザーの名前
};