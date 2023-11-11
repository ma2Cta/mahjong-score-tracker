import { Round } from "@/app/types/round";
import { User } from "@/app/types/user";

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
