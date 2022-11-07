-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "company_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
