-- CreateTable
CREATE TABLE `Users` (
    `dni` INTEGER NOT NULL,
    `username` VARCHAR(55) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(55) NOT NULL,
    `login_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `available_money` DECIMAL(10, 2) NOT NULL,
    `lastmove_amount` DECIMAL(10, 2) NOT NULL,
    `lastmove_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moves` (
    `id_moves` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `income_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `discount_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `movement_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_dni` INTEGER NOT NULL,
    `title` VARCHAR(35) NOT NULL,
    `currency_id` INTEGER NOT NULL,

    UNIQUE INDEX `Moves_id_moves_key`(`id_moves`),
    INDEX `Moves_user_dni_idx`(`user_dni`),
    INDEX `Moves_currency_id_idx`(`currency_id`),
    PRIMARY KEY (`id_moves`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `id_currency` INTEGER NOT NULL,
    `name` VARCHAR(35) NOT NULL DEFAULT 'ARG',

    UNIQUE INDEX `Currency_id_currency_key`(`id_currency`),
    PRIMARY KEY (`id_currency`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
