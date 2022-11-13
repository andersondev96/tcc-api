/*
  Warnings:

  - You are about to alter the column `number` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "number" SET DATA TYPE INTEGER;
