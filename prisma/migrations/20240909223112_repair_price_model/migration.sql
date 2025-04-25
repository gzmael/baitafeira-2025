/*
  Warnings:

  - You are about to drop the column `offerValidity` on the `Price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "offerValidity",
ADD COLUMN     "offerEndDate" TIMESTAMP(3),
ADD COLUMN     "offerStartDate" TIMESTAMP(3);
