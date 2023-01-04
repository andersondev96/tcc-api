-- CreateTable
CREATE TABLE "services_proposals" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_proposals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services_proposals" ADD CONSTRAINT "services_proposals_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_proposals" ADD CONSTRAINT "services_proposals_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
