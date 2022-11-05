-- DropForeignKey
ALTER TABLE "userTokens" DROP CONSTRAINT "userTokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "userTokens" ADD CONSTRAINT "userTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
