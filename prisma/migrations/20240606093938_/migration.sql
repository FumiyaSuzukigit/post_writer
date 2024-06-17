/*
  Warnings:

  - You are about to drop the column `access_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "accounts_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "access_token",
DROP COLUMN "providerId",
DROP COLUMN "refresh_token",
ADD COLUMN     "access_Token" TEXT,
ADD COLUMN     "refresh_Token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");
