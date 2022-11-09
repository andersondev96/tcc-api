/*
  Warnings:

  - You are about to drop the `companiesOnSchedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companiesOnSchedules" DROP CONSTRAINT "companiesOnSchedules_company_id_fkey";

-- DropForeignKey
ALTER TABLE "companiesOnSchedules" DROP CONSTRAINT "companiesOnSchedules_schedule_id_fkey";

-- DropTable
DROP TABLE "companiesOnSchedules";

-- DropTable
DROP TABLE "schedules";
