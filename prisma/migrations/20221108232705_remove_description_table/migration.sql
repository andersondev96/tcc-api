/*
  Warnings:

  - You are about to drop the `descriptionServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "descriptionServices" DROP CONSTRAINT "descriptionServices_company_id_fkey";

-- DropTable
DROP TABLE "descriptionServices";
