/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `runtime` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `vidUrl` on the `WatchList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchList" DROP COLUMN "imgUrl",
DROP COLUMN "overview",
DROP COLUMN "release_date",
DROP COLUMN "runtime",
DROP COLUMN "status",
DROP COLUMN "tagline",
DROP COLUMN "title",
DROP COLUMN "vidUrl";
