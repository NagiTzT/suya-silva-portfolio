export type Project = {
  id: string
  number: string
  title: string
  slug: string
  category: string
  description: string
  coverUrl: string
  images: { url: string; alt: string }[]
}
