-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "time_open" TEXT NOT NULL,
    "time_close" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);
