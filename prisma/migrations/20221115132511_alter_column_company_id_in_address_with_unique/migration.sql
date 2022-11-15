/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_company_id_key" ON "addresses"("company_id");
