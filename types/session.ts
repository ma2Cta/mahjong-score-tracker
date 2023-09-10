import { User } from './user';

export type Session = {
  id: number;
  date: Date;
  location: string;
  users: User[];
};
