-- CreateEnum
CREATE TYPE "plan_types" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,
    "prices" INTEGER NOT NULL,
    "type" "plan_types" NOT NULL DEFAULT 'MONTHLY',
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plans_storeId_idx" ON "plans"("storeId");

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
