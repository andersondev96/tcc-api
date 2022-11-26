/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `entrepreneurs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `entrepreneurs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entrepreneurs_user_id_key" ON "entrepreneurs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "entrepreneurs_company_id_key" ON "entrepreneurs"("company_id");
