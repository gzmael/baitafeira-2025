-- AlterEnum
ALTER TYPE "payment_methods" ADD VALUE 'MONEY';

-- AlterEnum
ALTER TYPE "status_orders" ADD VALUE 'PENDING_CONFIRMATION';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address" JSONB NOT NULL DEFAULT '{}';
