/*
  Warnings:

  - A unique constraint covering the columns `[barCode]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_barCode_key" ON "products"("barCode");
