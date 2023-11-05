import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  const response = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      sessions: null,
      scores: null,
    };
  });
  return NextResponse.json({ users: response });
}