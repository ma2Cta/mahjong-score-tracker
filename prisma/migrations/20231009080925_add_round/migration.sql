/*
  Warnings:

  - You are about to drop the column `gameId` on the `Score` table. All the data in the column will be lost.
  - Added the required column `roundId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_gameId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "gameId",
ADD COLUMN     "roundId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
