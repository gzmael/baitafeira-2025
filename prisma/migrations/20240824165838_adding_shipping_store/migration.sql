-- CreateEnum
CREATE TYPE "shipping_types" AS ENUM ('FIXED', 'FREE', 'NEIGHBORHOOD', 'DYNAMIC');

-- CreateTable
CREATE TABLE "shippings" (
    "id" TEXT NOT NULL,
    "type" "shipping_types" NOT NULL DEFAULT 'FREE',
    "attributes" JSONB,
    "minimumAmount" INTEGER,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shippings_storeId_key" ON "shippings"("storeId");

-- CreateIndex
CREATE INDEX "shippings_storeId_idx" ON "shippings"("storeId");

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
