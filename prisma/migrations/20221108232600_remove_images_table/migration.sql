/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imagesOnCompanies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "imagesOnCompanies" DROP CONSTRAINT "imagesOnCompanies_company_id_fkey";

-- DropForeignKey
ALTER TABLE "imagesOnCompanies" DROP CONSTRAINT "imagesOnCompanies_image_id_fkey";

-- DropTable
DROP TABLE "images";

-- DropTable
DROP TABLE "imagesOnCompanies";
