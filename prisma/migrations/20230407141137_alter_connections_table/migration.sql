/*
  Warnings:

  - A unique constraint covering the columns `[socket_id]` on the table `connection_socket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "connection_socket_socket_id_key" ON "connection_socket"("socket_id");
