/*
  Warnings:

  - You are about to drop the column `starts` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "starts",
ADD COLUMN     "stars" INTEGER DEFAULT 0;
