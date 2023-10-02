/*
  Warnings:

  - You are about to alter the column `movement_date` on the `Moves` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `login_date` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `lastmove_date` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Moves` MODIFY `movement_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Users` MODIFY `login_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `available_money` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `lastmove_amount` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `lastmove_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3);
