export interface HttpRequest<B> {
    body?: B
    params?: {
        id?: string
    } 
}
