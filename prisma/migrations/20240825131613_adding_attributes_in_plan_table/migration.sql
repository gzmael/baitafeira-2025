/*
  Warnings:

  - You are about to drop the column `banners` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `sales` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `users` on the `plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plans" DROP COLUMN "banners",
DROP COLUMN "prices",
DROP COLUMN "sales",
DROP COLUMN "users",
ADD COLUMN     "attributes" JSONB,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "period" INTEGER NOT NULL DEFAULT 1;
