-- CreateTable
CREATE TABLE "imagesOnCompanies" (
    "company_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagesOnCompanies_pkey" PRIMARY KEY ("company_id","image_id")
);

-- AddForeignKey
ALTER TABLE "imagesOnCompanies" ADD CONSTRAINT "imagesOnCompanies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagesOnCompanies" ADD CONSTRAINT "imagesOnCompanies_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
