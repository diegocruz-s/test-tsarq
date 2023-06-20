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

// id         String   @id @default(uuid())
//   name       String   @unique
//   band       String
//   duration   String
//   composer   String
//   categoryId String
//   year       Int
//   url String
//   createdAt  DateTime? @default(now())
