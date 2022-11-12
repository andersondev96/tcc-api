/*
  Warnings:

  - You are about to drop the column `company_id` on the `schedules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_company_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "company_id";
