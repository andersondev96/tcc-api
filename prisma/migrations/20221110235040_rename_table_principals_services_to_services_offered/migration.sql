/*
  Warnings:

  - You are about to drop the `PrincipalsServicesOnCompanies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `principalsServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrincipalsServicesOnCompanies" DROP CONSTRAINT "PrincipalsServicesOnCompanies_company_id_fkey";

-- DropForeignKey
ALTER TABLE "PrincipalsServicesOnCompanies" DROP CONSTRAINT "PrincipalsServicesOnCompanies_principal_service_id_fkey";

-- DropTable
DROP TABLE "PrincipalsServicesOnCompanies";

-- DropTable
DROP TABLE "principalsServices";

-- CreateTable
CREATE TABLE "ServicesOffered" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicesOffered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesOfferedonCompany" (
    "company_id" TEXT NOT NULL,
    "service_offered_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicesOfferedonCompany_pkey" PRIMARY KEY ("company_id","service_offered_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicesOffered_description_key" ON "ServicesOffered"("description");

-- AddForeignKey
ALTER TABLE "ServicesOfferedonCompany" ADD CONSTRAINT "ServicesOfferedonCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOfferedonCompany" ADD CONSTRAINT "ServicesOfferedonCompany_service_offered_id_fkey" FOREIGN KEY ("service_offered_id") REFERENCES "ServicesOffered"("id") ON DELETE CASCADE ON UPDATE CASCADE;
