/*
  Warnings:

  - You are about to drop the column `day_of_week` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `weekday` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "day_of_week",
ADD COLUMN     "weekday" TEXT NOT NULL;
