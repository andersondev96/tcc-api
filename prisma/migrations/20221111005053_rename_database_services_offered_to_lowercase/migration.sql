/*
  Warnings:

  - You are about to drop the `ServicesOffered` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicesOfferedonCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicesOfferedonCompany" DROP CONSTRAINT "ServicesOfferedonCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "ServicesOfferedonCompany" DROP CONSTRAINT "ServicesOfferedonCompany_service_offered_id_fkey";

-- DropTable
DROP TABLE "ServicesOffered";

-- DropTable
DROP TABLE "ServicesOfferedonCompany";

-- CreateTable
CREATE TABLE "servicesOffered" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicesOffered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicesOfferedonCompany" (
    "company_id" TEXT NOT NULL,
    "service_offered_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicesOfferedonCompany_pkey" PRIMARY KEY ("company_id","service_offered_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servicesOffered_description_key" ON "servicesOffered"("description");

-- AddForeignKey
ALTER TABLE "servicesOfferedonCompany" ADD CONSTRAINT "servicesOfferedonCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicesOfferedonCompany" ADD CONSTRAINT "servicesOfferedonCompany_service_offered_id_fkey" FOREIGN KEY ("service_offered_id") REFERENCES "servicesOffered"("id") ON DELETE CASCADE ON UPDATE CASCADE;
