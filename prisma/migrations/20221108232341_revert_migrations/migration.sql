/*
  Warnings:

  - You are about to drop the column `company_id` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contact_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_company_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "contact_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "company_id";

-- CreateIndex
CREATE UNIQUE INDEX "companies_contact_id_key" ON "companies"("contact_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
