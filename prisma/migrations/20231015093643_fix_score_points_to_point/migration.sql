/*
  Warnings:

  - You are about to drop the column `points` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "points",
ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 0;
