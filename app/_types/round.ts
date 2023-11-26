import { CreateScoreData, Score } from "@/app/_types/score";
import { Game } from "@/app/_types/game";

export type Round = {
  id: number;
  round: number;
  wind: Wind;
  roundInWind: number;
  game: Game;
  scores: Score[];
};

export enum Wind {
  東 = 0,
  南 = 1,
  西 = 2,
  北 = 3,
}

export function toWind(value: number | string): string {
  if (typeof value === "number") {
    return Wind[value];
  } else if (Object.values(Wind).includes(value as any)) {
    return value;
  }
  throw new Error("Invalid Wind value");
}

export function roundNames(wind: Wind, roundInWind: number): string {
  return `${Wind[wind]}${roundInWind}局`;
}

export type CreateRoundData = {
  wind: Wind;
  roundInWind: number;
  scores: CreateScoreData[];
};
