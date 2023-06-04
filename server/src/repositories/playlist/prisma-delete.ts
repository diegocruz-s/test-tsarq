import { prisma } from "../../database/prisma/prisma";
import { IDatasDeletePlaylistRepository, IDeletePlaylistRepository } from "../../interfaces/playlist/delete/delete";

export class PlaylistDeleteRepository implements IDeletePlaylistRepository {
    async delete(datas: IDatasDeletePlaylistRepository): Promise<string> {
        const playlist = await prisma.playlist.findFirst({
            where: {
                AND: [
                    {
                        id: datas.playlistId
                    },
                    {
                        userId: datas.userId
                    }
                ]
            }
        })

        if(!playlist) throw new Error('Playlist not found!')

        if(playlist.userId !== datas.userId) throw new Error('You can only delete the playlist you created!')

        const deletePlaylist = await prisma.playlist.delete({
            where: {
                id: playlist.id
            }
        })

        if(!deletePlaylist) {
            throw new Error('Error deleting playlist!')
        }

        const messageSuccess = 'Playlist deleted with success!'

        return messageSuccess
    }
}