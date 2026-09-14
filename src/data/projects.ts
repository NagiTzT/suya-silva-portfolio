import type { Project } from '../types'

const asset = (name: string) => new URL(`../assets/portfolio/${name}.webp`, import.meta.url).href

const makeImages = (prefix: string, count: number, label: string) =>
  Array.from({ length: count }, (_, index) => ({
    url: asset(`${prefix}-${index + 1}`),
    alt: `${label} — arte ${index + 1}`,
  }))

export const localProjects: Project[] = [
  {
    id: 'drinks', number: '01', title: 'Drinks', slug: 'drinks', category: 'Social Media',
    description: 'Composições para bar e coquetelaria com atmosfera noturna, fotografia e tipografia expressiva.',
    coverUrl: asset('drinks-1'), images: makeImages('drinks', 4, 'Social Media — Drinks'),
  },
  {
    id: 'futebol', number: '02', title: 'Futebol', slug: 'futebol', category: 'Editorial',
    description: 'Uma série sobre futebol e cultura brasileira com colagem, textura e narrativa editorial.',
    coverUrl: asset('futebol-1'), images: makeImages('futebol', 6, 'Editorial — Futebol'),
  },
  {
    id: 'padaria', number: '03', title: 'Padaria', slug: 'padaria', category: 'Social Media',
    description: 'Direção visual leve e apetitosa para confeitaria, com cor, produto e personalidade.',
    coverUrl: asset('padaria-1'), images: makeImages('padaria', 4, 'Social Media — Padaria'),
  },
  {
    id: 'haircare', number: '04', title: 'Hair Care', slug: 'hair-care', category: 'Editorial',
    description: 'Conteúdo educativo de beleza com fotografia sensorial e linguagem editorial sofisticada.',
    coverUrl: asset('haircare-1'), images: makeImages('haircare', 4, 'Editorial — Hair Care'),
  },
  {
    id: 'design', number: '05', title: 'Design', slug: 'design', category: 'Conteúdo',
    description: 'Comunicação sobre design e presença digital construída com colagens e contrastes.',
    coverUrl: asset('design-2'), images: makeImages('design', 5, 'Conteúdo — Design'),
  },
  {
    id: 'sushi', number: '06', title: 'Sushi', slug: 'sushi', category: 'Social Media',
    description: 'Campanha gastronômica direta, vibrante e focada em desejo de consumo.',
    coverUrl: asset('sushi-3'), images: makeImages('sushi', 4, 'Social Media — Sushi'),
  },
  {
    id: 'odontologia', number: '07', title: 'Odontologia', slug: 'odontologia', category: 'Social Media',
    description: 'Conteúdo de saúde com linguagem acolhedora, clareza informativa e presença visual.',
    coverUrl: asset('odontologia-2'), images: makeImages('odontologia', 4, 'Social Media — Odontologia'),
  },
]
