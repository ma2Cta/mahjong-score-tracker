import { Set } from '@/types/set';
import { Score } from '@/types/score';

export type User = {
  id: number;
  name: string;
  sets: Set[] | null;
  scores: Score[] | null;
};
