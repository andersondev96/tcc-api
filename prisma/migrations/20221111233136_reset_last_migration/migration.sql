/*
  Warnings:

  - You are about to drop the column `services_offered` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "services_offered",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "services" TEXT[];
