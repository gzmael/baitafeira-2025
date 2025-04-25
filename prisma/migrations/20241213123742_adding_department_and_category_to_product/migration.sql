-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "departmentId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
