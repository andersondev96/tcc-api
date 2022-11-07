/*
  Warnings:

  - Added the required column `company_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
