/*
  Warnings:

  - You are about to drop the column `user_id` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the `_ChatRoomUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `connection_id` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatRoomUsers" DROP CONSTRAINT "_ChatRoomUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomUsers" DROP CONSTRAINT "_ChatRoomUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_user_id_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "user_id",
ADD COLUMN     "connection_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ChatRoomUsers";

-- CreateTable
CREATE TABLE "_ChatRoomConnections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoomConnections_AB_unique" ON "_ChatRoomConnections"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoomConnections_B_index" ON "_ChatRoomConnections"("B");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connection_socket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomConnections" ADD CONSTRAINT "_ChatRoomConnections_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomConnections" ADD CONSTRAINT "_ChatRoomConnections_B_fkey" FOREIGN KEY ("B") REFERENCES "connection_socket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
