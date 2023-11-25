import { Round } from "@/app/_types/round";
import { User } from "@/app/_types/user";

export type Score = {
  id: number;
  user: User | null;
  round: Round | null;
  point: number;
}

export type CreateScoreData = {
  userId: number,
  point: number
}
