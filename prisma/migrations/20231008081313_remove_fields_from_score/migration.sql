/*
  Warnings:

  - You are about to drop the column `ranking` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "ranking",
DROP COLUMN "round";
