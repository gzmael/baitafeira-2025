/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `profiles_stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profiles_stores_userId_key" ON "profiles_stores"("userId");
