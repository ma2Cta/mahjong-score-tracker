import { Round } from "@/app/_types/round";
import { Set } from "@/app/_types/set";
import { User } from "@/app/_types/user";

export type Game = {
  id: number;
  startAt: Date;
  roundLength: RoundLength;
  set: Set | null;
  rounds: Round[] | null;
};

export enum RoundLength {
  One = 1,
  Half = 2,
  Full = 4,
}

export function toRoundLength(value: number): RoundLength {
  if (Object.values(RoundLength).includes(value)) {
    return value as RoundLength;
  }
  throw new Error("Invalid RoundLength value");
}

export function roundLengthNames(roundLength: RoundLength): String {
  switch (roundLength) {
    case RoundLength.One:
      return "東風戦";
    case RoundLength.Half:
      return "半荘戦";
    case RoundLength.Full:
      return "一荘戦";
  }
}

export type GameResult = {
  place: number;
  userTotalScore: UserTotalScore;
};

export type UserTotalScore = {
  user: User;
  totalScore: number;
};

export function buildGameResult(game: Game): GameResult[] {
  const userScores = calculateUserScores(game);
  const results: GameResult[] = [];
  Object.values(userScores).forEach((userScore) => {
    results.push({
      place: 0,
      userTotalScore: userScore,
    });
  });
  results.sort((a, b) => {
    return b.userTotalScore.totalScore - a.userTotalScore.totalScore;
  });
  results.forEach((result, index) => {
    result.place = index + 1;
  });
  return results;
}

function calculateUserScores(game: Game): Record<number, UserTotalScore> {
  if (game.rounds === null || game.rounds.length === 0) {
    return {};
  }

  const lastScores = game.rounds[game.rounds.length - 1].scores;
  return lastScores.map((score) => {
    if (score.user === null) {
      throw new Error("User is null");
    }
    return {
      user: score.user,
      totalScore: score.point,
    };
  });
}
