/*
  Warnings:

  - You are about to drop the column `category_id` on the `services` table. All the data in the column will be lost.
  - Added the required column `category` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_category_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "category_id",
ADD COLUMN     "category" TEXT NOT NULL;
