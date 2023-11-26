import { User } from "./user";
import { Game } from "./game";

export type Set = {
  id: number;
  date: Date;
  location: string;
  users: User[] | null;
  games: Game[] | null;
};
