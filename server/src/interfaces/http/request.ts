export interface HttpRequest<B> {
    body?: B
    params?: {
        id?: string
        userId?: string
        musicId?: string
    }
    query?: {
        id?: string
        musicId?: string
        take: number | string
        skip: number | string
        name?: string
    } 
}
