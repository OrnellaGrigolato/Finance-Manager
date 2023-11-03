/*
  Warnings:

  - Added the required column `DorO_id` to the `Moves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moves" ADD COLUMN     "DorO_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DestinyOrOrigin" (
    "id_DorO" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DestinyOrOrigin_pkey" PRIMARY KEY ("id_DorO")
);

-- CreateIndex
CREATE UNIQUE INDEX "DestinyOrOrigin_id_DorO_key" ON "DestinyOrOrigin"("id_DorO");

-- CreateIndex
CREATE UNIQUE INDEX "DestinyOrOrigin_name_key" ON "DestinyOrOrigin"("name");

-- CreateIndex
CREATE INDEX "Moves_DorO_id_idx" ON "Moves"("DorO_id");

-- AddForeignKey
ALTER TABLE "Moves" ADD CONSTRAINT "Moves_DorO_id_fkey" FOREIGN KEY ("DorO_id") REFERENCES "DestinyOrOrigin"("id_DorO") ON DELETE RESTRICT ON UPDATE CASCADE;
