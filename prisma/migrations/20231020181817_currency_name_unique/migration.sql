/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");
