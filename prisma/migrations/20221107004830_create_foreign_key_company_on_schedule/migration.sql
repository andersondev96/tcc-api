-- CreateTable
CREATE TABLE "companiesOnSchedules" (
    "company_id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companiesOnSchedules_pkey" PRIMARY KEY ("company_id","schedule_id")
);

-- AddForeignKey
ALTER TABLE "companiesOnSchedules" ADD CONSTRAINT "companiesOnSchedules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companiesOnSchedules" ADD CONSTRAINT "companiesOnSchedules_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
