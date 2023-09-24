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
