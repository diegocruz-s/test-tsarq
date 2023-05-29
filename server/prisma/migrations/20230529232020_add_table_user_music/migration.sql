-- CreateTable
CREATE TABLE `user_music` (
    `userId` VARCHAR(191) NOT NULL,
    `musicId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `musicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_music` ADD CONSTRAINT `user_music_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_music` ADD CONSTRAINT `user_music_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
