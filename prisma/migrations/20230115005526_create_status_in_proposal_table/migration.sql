/*
  Warnings:

  - The `files` column on the `budgets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "files",
ADD COLUMN     "files" TEXT[];

-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "status" TEXT DEFAULT 'Waiting for budget';
