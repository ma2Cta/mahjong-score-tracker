export type Game = {
  id: number;
  date: Date;
  session_id: number;
  round: GameRound;
}

export enum GameRound {
  One = 1,
  Half = 2,
  Full = 4,
}

export function toGameRound(value: number): GameRound {
  if (Object.values(GameRound).includes(value)) {
      return value as GameRound;
  }
  throw new Error('Invalid GameRound value');
}

export function gameRoundNames(gameRound: GameRound): String {
  switch (gameRound) {
    case GameRound.One:
      return "東風戦";
    case GameRound.Half:
      return "半荘戦";
    case GameRound.Full:
      return "一荘戦";
  }
}