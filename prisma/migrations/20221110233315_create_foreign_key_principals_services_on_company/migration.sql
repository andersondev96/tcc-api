-- CreateTable
CREATE TABLE "PrincipalsServicesOnCompanies" (
    "company_id" TEXT NOT NULL,
    "principal_service_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrincipalsServicesOnCompanies_pkey" PRIMARY KEY ("company_id","principal_service_id")
);

-- AddForeignKey
ALTER TABLE "PrincipalsServicesOnCompanies" ADD CONSTRAINT "PrincipalsServicesOnCompanies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrincipalsServicesOnCompanies" ADD CONSTRAINT "PrincipalsServicesOnCompanies_principal_service_id_fkey" FOREIGN KEY ("principal_service_id") REFERENCES "principalsServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
