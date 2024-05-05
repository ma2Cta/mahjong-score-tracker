import { z } from "zod";

export const createSetFormSchema = z.object({
  date: z.date().refine((date) => date <= new Date(), {
    message: "日付は現在と同じかそれより前でなければなりません。",
  }),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
  location: z.string().min(1).max(100),
  selectedUsers: z
    .array(
      z.object({
        userId: z.number(),
        name: z.string(),
        image: z.string().nullable(),
      })
    ),
  isThree: z.boolean(),
  basePoint: z.number().min(100),
}).refine((data) => {
  // isThreeがtrueの場合、selectedUsersの長さは3でなければならない
  if (data.isThree && data.selectedUsers.length !== 3) {
    return false;
  }
  // isThreeがfalseの場合、selectedUsersの長さは4でなければならない
  if (!data.isThree && data.selectedUsers.length !== 4) {
    return false;
  }
  return true;
}, {
  message: "四人麻雀のユーザー数は4でなければなりません。三人麻雀のユーザー数は3でなければなりません。",
});
