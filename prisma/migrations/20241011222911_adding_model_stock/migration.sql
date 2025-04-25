/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_productId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_storeId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isFractional" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Price";

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "offerCost" INTEGER,
    "offerStartDate" TIMESTAMP(3),
    "offerEndDate" TIMESTAMP(3),
    "isOffer" BOOLEAN NOT NULL DEFAULT false,
    "updatedBy" TEXT,
    "maxUnits" INTEGER NOT NULL DEFAULT 5,
    "isEnabledSale" BOOLEAN NOT NULL DEFAULT true,
    "isFractionalSale" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "minAlert" INTEGER NOT NULL DEFAULT 5,
    "priceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "prices_productId_idx" ON "prices"("productId");

-- CreateIndex
CREATE INDEX "prices_storeId_idx" ON "prices"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_priceId_key" ON "stocks"("priceId");

-- CreateIndex
CREATE INDEX "stocks_priceId_idx" ON "stocks"("priceId");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
