import { prisma } from "../../database/prisma/prisma";
import { IPlaylistUpdateRepository } from "../../interfaces/playlist/update/update";
import { Playlist } from "../../models/playlist";

export class PlaylistUpdateRepository implements IPlaylistUpdateRepository {
    async update(datas: Playlist): Promise<Playlist> {
        const existsPlaylist = await prisma.playlist.findUnique({
            where: {      
                id: datas.id    
            }
        })
        if(!existsPlaylist) throw new Error('Playlist not found!')
        if(datas.userId !== existsPlaylist.userId) throw new Error('You can only update the playlist you created!')

        const checkingNameAlreadyExistsInPlaylist = await prisma.playlist.findFirst({
            where: {
                AND: [
                    {
                        userId: datas.userId
                    }, 
                    {
                        name: datas.name
                    }
                ]
            }
        })
        if(checkingNameAlreadyExistsInPlaylist) throw new Error('Playlist already exists!')

        const updatedPlaylist = await prisma.playlist.update({
            where: {
                id: datas.id
            },
            data: {
                name: datas.name
            }
        })

        return updatedPlaylist

    }
}