import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  const name = searchParams.get("name");
  const where = name
    ? {
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};
  const users = await prisma.user.findMany({
    where,
    orderBy: { id: "asc" },
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
  const totalUsers = await prisma.user.count({ where });
  const totalPageCount = Math.ceil(totalUsers / pageSize);

  const convertedUsers = users.map(({ id, name, email, image }) => ({
    id,
    name,
    email,
    image,
    sets: null,
    scores: null,
  }));
  return NextResponse.json({
    users: convertedUsers,
    page: pageNumber,
    size: pageSize,
    totalPageCount,
  });
}
