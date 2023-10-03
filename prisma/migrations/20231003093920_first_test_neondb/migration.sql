-- CreateTable
CREATE TABLE "Users" (
    "dni" INTEGER NOT NULL,
    "username" VARCHAR(55) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "login_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "available_money" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "lastmove_amount" DECIMAL(10,2) DEFAULT 0,
    "lastmove_date" TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "Moves" (
    "id_moves" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "income_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "movement_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_dni" INTEGER NOT NULL,
    "title" VARCHAR(35) NOT NULL,
    "currency_id" INTEGER NOT NULL,

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("id_moves")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id_currency" SERIAL NOT NULL,
    "name" VARCHAR(35) NOT NULL DEFAULT 'ARG',

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id_currency")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Moves_id_moves_key" ON "Moves"("id_moves");

-- CreateIndex
CREATE INDEX "Moves_user_dni_idx" ON "Moves"("user_dni");

-- CreateIndex
CREATE INDEX "Moves_currency_id_idx" ON "Moves"("currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_currency_key" ON "Currency"("id_currency");

-- AddForeignKey
ALTER TABLE "Moves" ADD CONSTRAINT "Moves_user_dni_fkey" FOREIGN KEY ("user_dni") REFERENCES "Users"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moves" ADD CONSTRAINT "Moves_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id_currency") ON DELETE RESTRICT ON UPDATE CASCADE;
