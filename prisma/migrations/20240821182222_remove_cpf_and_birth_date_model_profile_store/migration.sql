/*
  Warnings:

  - You are about to drop the column `birthDate` on the `profiles_stores` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `profiles_stores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `profiles_stores` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "profiles_stores_cpf_key";

-- AlterTable
ALTER TABLE "profiles_stores" DROP COLUMN "birthDate",
DROP COLUMN "cpf";

-- CreateIndex
CREATE UNIQUE INDEX "profiles_stores_phone_key" ON "profiles_stores"("phone");
