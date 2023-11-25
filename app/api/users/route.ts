import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const where = name
    ? {
        name: { 
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};
  const users = await prisma.user.findMany({ where });
  const response = users.map(({ id, name, email, image }) => ({
    id,
    name,
    email,
    image,
    sets: null,
    scores: null,
  }));
  return NextResponse.json({ users: response });
}
