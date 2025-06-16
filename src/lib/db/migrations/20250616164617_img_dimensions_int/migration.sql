/*
  Warnings:

  - Changed the type of `img_height` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `img_width` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "img_height",
ADD COLUMN     "img_height" INTEGER NOT NULL,
DROP COLUMN "img_width",
ADD COLUMN     "img_width" INTEGER NOT NULL;
