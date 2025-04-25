/*
  Warnings:

  - You are about to drop the column `price` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `plans` table. All the data in the column will be lost.
  - Added the required column `cost` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_storeId_fkey";

-- DropIndex
DROP INDEX "plans_storeId_idx";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "price",
DROP COLUMN "storeId",
ADD COLUMN     "cost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "planId" TEXT;

-- CreateIndex
CREATE INDEX "stores_planId_idx" ON "stores"("planId");

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
