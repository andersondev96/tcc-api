-- CreateTable
CREATE TABLE "userTokens" (
    "id" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "userTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTokens" ADD CONSTRAINT "userTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
