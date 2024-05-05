import { User } from "./user";
import { Game } from "./game";

export type Set = {
  id: number;
  startAt: Date;
  location: string;
  isThree: boolean;
  basePoint: number;
  users: User[] | null;
  games: Game[] | null;
};
