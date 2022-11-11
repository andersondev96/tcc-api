/*
  Warnings:

  - You are about to drop the column `description` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the `servicesOffered` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicesOfferedonCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "servicesOfferedonCompany" DROP CONSTRAINT "servicesOfferedonCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "servicesOfferedonCompany" DROP CONSTRAINT "servicesOfferedonCompany_service_offered_id_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "description",
ADD COLUMN     "services_offered" TEXT[];

-- DropTable
DROP TABLE "servicesOffered";

-- DropTable
DROP TABLE "servicesOfferedonCompany";
