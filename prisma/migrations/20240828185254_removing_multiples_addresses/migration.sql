/*
  Warnings:

  - You are about to drop the column `latitude` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `stores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_storeId_key" ON "addresses"("storeId");
