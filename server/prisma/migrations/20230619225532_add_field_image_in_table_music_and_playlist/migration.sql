/*
  Warnings:

  - Added the required column `image` to the `musics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `playlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `musics` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playlists` ADD COLUMN `image` VARCHAR(191) NOT NULL;
