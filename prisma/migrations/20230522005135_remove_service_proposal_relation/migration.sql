/*
  Warnings:

  - You are about to drop the `services_proposals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "services_proposals" DROP CONSTRAINT "services_proposals_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "services_proposals" DROP CONSTRAINT "services_proposals_service_id_fkey";

-- DropTable
DROP TABLE "services_proposals";
