-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientific" TEXT,
    "watering" INTEGER NOT NULL,
    "waterings" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "next_watering" TIMESTAMP(3),
    "fertilization" INTEGER NOT NULL,
    "fertilizations" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "next_fertilization" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
