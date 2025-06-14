-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "location_place" TEXT,
ADD COLUMN     "location_type" TEXT,
ADD COLUMN     "under_rain" BOOLEAN NOT NULL DEFAULT false;
