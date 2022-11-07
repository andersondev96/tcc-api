-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "physical_localization" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
