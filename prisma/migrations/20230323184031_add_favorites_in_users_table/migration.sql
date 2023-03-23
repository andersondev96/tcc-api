-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "favorites" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "favorites" TEXT[];
