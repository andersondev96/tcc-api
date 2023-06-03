/*
  Warnings:

  - You are about to drop the column `card_color` on the `entrepreneurs_settings` table. All the data in the column will be lost.
  - You are about to drop the column `service_name_color` on the `entrepreneurs_settings` table. All the data in the column will be lost.
  - You are about to drop the column `service_price_color` on the `entrepreneurs_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entrepreneurs_settings" DROP COLUMN "card_color",
DROP COLUMN "service_name_color",
DROP COLUMN "service_price_color",
ADD COLUMN     "company_logo" TEXT;
