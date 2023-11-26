import { Set } from "@/app/_types/set";
import { Score } from "@/app/_types/score";

export type User = {
  id: number;
  name: string;
  email: string | null;
  image: string | null;
  sets: Set[] | null;
  scores: Score[] | null;
};
