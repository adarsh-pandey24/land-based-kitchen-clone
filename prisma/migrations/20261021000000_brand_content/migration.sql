-- AlterTable
ALTER TABLE "CateringService" ADD COLUMN     "buttonLabel" TEXT,
ADD COLUMN     "cardLine" TEXT,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "goodFor" TEXT,
ADD COLUMN     "group" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "guests" TEXT,
ADD COLUMN     "heading" TEXT,
ADD COLUMN     "sampleDishes" TEXT,
ADD COLUMN     "smallPrint" TEXT;

-- AlterTable
ALTER TABLE "ChefMenu" ADD COLUMN     "group" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pdfUrl" TEXT;

-- CreateIndex
CREATE INDEX "CateringService_group_idx" ON "CateringService"("group");

-- CreateIndex
CREATE INDEX "ChefMenu_group_idx" ON "ChefMenu"("group");

