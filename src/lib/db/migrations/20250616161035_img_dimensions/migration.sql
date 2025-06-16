/*
  Warnings:

  - Added the required column `img_height` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_width` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "img_height" TEXT NOT NULL,
ADD COLUMN     "img_width" TEXT NOT NULL;
