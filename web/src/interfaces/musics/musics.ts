export interface Music {
    id: string 
    name: string
    band: string
    duration: string
    composer: string
    categoryId: string
    year: number
    url: string
    createdAt: Date | null
    image: string
}

export interface IDatasGetMusics {
    take: number
    skip: number
    name: string
}

export interface Category {
    id: string
    name: string
}