/*
  Warnings:

  - A unique constraint covering the columns `[contact_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "contact_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_contact_id_key" ON "companies"("contact_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
