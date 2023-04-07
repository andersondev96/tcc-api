/*
  Warnings:

  - You are about to drop the column `company_id` on the `chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_company_id_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "company_id";
