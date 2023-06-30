export interface Playlist {
    id: string
    name: string
    userId: string
    image: string
    _count?: {
        musics: number
    }
}