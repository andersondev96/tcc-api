/*
  Warnings:

  - You are about to drop the `assessmentsCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assessmentsCompany" DROP CONSTRAINT "assessmentsCompany_company_id_fkey";

-- DropForeignKey
ALTER TABLE "assessmentsCompany" DROP CONSTRAINT "assessmentsCompany_user_id_fkey";

-- DropTable
DROP TABLE "assessmentsCompany";

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
