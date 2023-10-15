import { Round } from "@/types/round";
import { User } from "@/types/user";

export type Score = {
  id: number;
  user: User | null;
  round: Round | null;
  point: number;
}
