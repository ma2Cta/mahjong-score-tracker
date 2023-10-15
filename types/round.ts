import { Score } from '@/types/score';
import { Game } from '@/types/game';

export type Round = {
  id: number;
  round: number;
  game: Game;
  scores: Score[];
}