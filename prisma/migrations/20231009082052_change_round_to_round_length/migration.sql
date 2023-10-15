/*
  Warnings:

  - You are about to drop the column `gameRound` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameRound",
ADD COLUMN     "roundLength" INTEGER NOT NULL DEFAULT 1;
