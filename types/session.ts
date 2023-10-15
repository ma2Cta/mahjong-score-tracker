import { User } from './user';
import { Game } from './game';

export type Session = {
  id: number;
  date: Date;
  location: string;
  users: User[] | null;
  games: Game[] | null;
};
