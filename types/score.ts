import { Game } from "@/types/game";
import { User } from "@/types/user";

export type Score = {
  id: number;
  user: User | null;
  game: Game
  points: number;
}
