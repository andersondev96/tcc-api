/*
  Warnings:

  - You are about to drop the `AssesmentsCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssesmentsCompany" DROP CONSTRAINT "AssesmentsCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "AssesmentsCompany" DROP CONSTRAINT "AssesmentsCompany_user_id_fkey";

-- DropTable
DROP TABLE "AssesmentsCompany";

-- CreateTable
CREATE TABLE "assesmentsCompany" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assesmentsCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assesmentsCompany" ADD CONSTRAINT "assesmentsCompany_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assesmentsCompany" ADD CONSTRAINT "assesmentsCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
