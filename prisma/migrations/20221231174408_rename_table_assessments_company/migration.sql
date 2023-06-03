/*
  Warnings:

  - You are about to drop the `assesmentsCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assesmentsCompany" DROP CONSTRAINT "assesmentsCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "assesmentsCompany" DROP CONSTRAINT "assesmentsCompany_user_id_fkey";

-- DropTable
DROP TABLE "assesmentsCompany";

-- CreateTable
CREATE TABLE "assessmentsCompany" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessmentsCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessmentsCompany" ADD CONSTRAINT "assessmentsCompany_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessmentsCompany" ADD CONSTRAINT "assessmentsCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
