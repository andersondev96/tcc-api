/*
  Warnings:

  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_company_id_fkey";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "descriptionServices" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "descriptionServices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "descriptionServices" ADD CONSTRAINT "descriptionServices_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
