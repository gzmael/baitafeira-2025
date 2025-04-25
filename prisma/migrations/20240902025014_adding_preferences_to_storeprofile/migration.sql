-- AlterEnum
ALTER TYPE "status_stores" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "profiles_stores" ADD COLUMN     "preferences" JSONB;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "deletedAt" TIMESTAMP(3);
