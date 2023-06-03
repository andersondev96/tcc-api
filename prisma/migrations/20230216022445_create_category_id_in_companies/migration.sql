/*
  Warnings:

  - You are about to drop the column `category` on the `companies` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
