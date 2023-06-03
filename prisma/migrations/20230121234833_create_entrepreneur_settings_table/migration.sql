-- CreateTable
CREATE TABLE "entrepreneurs_settings" (
    "id" TEXT NOT NULL,
    "entrepreneur_id" TEXT NOT NULL,
    "service_name_color" TEXT DEFAULT 'gray-800',
    "service_price_color" TEXT DEFAULT 'yellow-900',
    "card_color" TEXT DEFAULT 'gray-400',
    "highlight_services_quantity" INTEGER DEFAULT 3,
    "online_budget" BOOLEAN DEFAULT false,
    "online_chat" BOOLEAN DEFAULT false,
    "email_notification" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entrepreneurs_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entrepreneurs_settings_entrepreneur_id_key" ON "entrepreneurs_settings"("entrepreneur_id");

-- AddForeignKey
ALTER TABLE "entrepreneurs_settings" ADD CONSTRAINT "entrepreneurs_settings_entrepreneur_id_fkey" FOREIGN KEY ("entrepreneur_id") REFERENCES "entrepreneurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
