import { User } from "@prisma/client";

export type Session = {
  id: number;
  date: Date;
  location: string;
  users: User[];
};