-- CreateTable
CREATE TABLE "images_company" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "image_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_company" ADD CONSTRAINT "images_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
