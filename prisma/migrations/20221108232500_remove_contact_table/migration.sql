/*
  Warnings:

  - You are about to drop the column `contact_id` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_contact_id_fkey";

-- DropIndex
DROP INDEX "companies_contact_id_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "contact_id";

-- DropTable
DROP TABLE "contacts";
