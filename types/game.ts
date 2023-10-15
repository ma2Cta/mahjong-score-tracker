import { Round } from '@/types/round';
import { Session } from '@/types/session';

export type Game = {
  id: number;
  date: Date;
  roundLength: RoundLength;
  session: Session | null;
  rounds: Round[] | null;
}

export enum RoundLength {
  One = 1,
  Half = 2,
  Full = 4,
}

export function toRoundLength(value: number): RoundLength {
  if (Object.values(RoundLength).includes(value)) {
      return value as RoundLength;
  }
  throw new Error('Invalid RoundLength value');
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
