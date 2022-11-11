-- CreateTable
CREATE TABLE "servicesOfferedonCompany" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "service_offered_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicesOfferedonCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servicesOfferedonCompany" ADD CONSTRAINT "servicesOfferedonCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicesOfferedonCompany" ADD CONSTRAINT "servicesOfferedonCompany_service_offered_id_fkey" FOREIGN KEY ("service_offered_id") REFERENCES "servicesOffered"("id") ON DELETE CASCADE ON UPDATE CASCADE;
