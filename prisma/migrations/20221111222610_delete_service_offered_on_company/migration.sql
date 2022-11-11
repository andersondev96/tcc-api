/*
  Warnings:

  - You are about to drop the `servicesOfferedonCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "servicesOfferedonCompany" DROP CONSTRAINT "servicesOfferedonCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "servicesOfferedonCompany" DROP CONSTRAINT "servicesOfferedonCompany_service_offered_id_fkey";

-- DropTable
DROP TABLE "servicesOfferedonCompany";
