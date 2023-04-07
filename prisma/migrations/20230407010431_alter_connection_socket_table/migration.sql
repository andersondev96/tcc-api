/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `connection_socket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "connection_socket_user_id_key" ON "connection_socket"("user_id");
