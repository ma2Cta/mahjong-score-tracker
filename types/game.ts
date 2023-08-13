export type Game = {
  id: number;
  session_id: number;
  round: GameRound;
}

enum GameRound {
  One = 1,
  Half = 2,
  Full = 4,
}