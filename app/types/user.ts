import { Set } from '@/app/types/set';
import { Score } from '@/app/types/score';

export type User = {
  id: number;
  name: string;
  sets: Set[] | null;
  scores: Score[] | null;
};
