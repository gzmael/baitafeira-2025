/*
  Warnings:

  - A unique constraint covering the columns `[zipCode]` on the table `zip_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "zip_codes_zipCode_key" ON "zip_codes"("zipCode");
