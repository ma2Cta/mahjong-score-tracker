import { Score } from '@/types/score';
import { Game } from '@/types/game';

export type Round = {
  id: number;
  round: number;
  wind: Wind;
  roundInWind: number;
  game: Game;
  scores: Score[];
}

export enum Wind {
  East = 0,
  South = 1,
  West = 2,
  North = 3,
}

export function toWind(value: number): Wind {
  if (Object.values(Wind).includes(value)) {
      return value as Wind;
  }
  throw new Error('Invalid Wind value');
}

export function roundNames(wind: Wind, roundInWind: number): String {
  console.log(wind, roundInWind);
  switch (wind) {
    case Wind.East:
      return `東${roundInWind}局`;
    case Wind.South:
      return `南${roundInWind}局`;
    case Wind.West:
      return `西${roundInWind}局`;
    case Wind.North:
      return `北${roundInWind}局`;
  }
}