import { Session } from '@/types/session';
import { Score } from '@/types/score';

export type User = {
  id: number;
  name: string;
  sessions: Session[] | null;
  scores: Score[] | null;
};
