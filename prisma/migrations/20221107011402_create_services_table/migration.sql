-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "highlight_service" BOOLEAN NOT NULL,
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "starts" INTEGER NOT NULL DEFAULT 0,
    "assessments" INTEGER NOT NULL DEFAULT 0,
    "company_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
