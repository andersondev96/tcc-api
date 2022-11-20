-- AlterTable
ALTER TABLE "services" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "highlight_service" DROP NOT NULL,
ALTER COLUMN "highlight_service" SET DEFAULT false,
ALTER COLUMN "favorites" DROP NOT NULL,
ALTER COLUMN "starts" DROP NOT NULL,
ALTER COLUMN "assessments" DROP NOT NULL;
