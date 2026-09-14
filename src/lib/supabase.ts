import type { Project } from '../types'
import { localProjects } from '../data/projects'
import type { SupabaseClient } from '@supabase/supabase-js'

let clientPromise: Promise<SupabaseClient> | null = null

function getClient(url: string, key: string) {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, key),
    )
  }
  return clientPromise
}

type ProjectRow = {
  id: string
  title: string
  slug: string
  category: string
  description: string | null
  cover_url: string
  position: number
  project_images?: { image_url: string; alt_text: string | null; position: number }[]
}

export async function loadProjects(): Promise<Project[]> {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return localProjects

  try {
    const client = await getClient(url, key)
    const { data, error } = await client
      .from('projects')
      .select('id,title,slug,category,description,cover_url,position,project_images(image_url,alt_text,position)')
      .order('position')
      .order('position', { referencedTable: 'project_images' })

    if (error || !data?.length) return localProjects
    return (data as ProjectRow[]).map((project, index) => ({
      id: project.id,
      number: String(index + 1).padStart(2, '0'),
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description ?? '',
      coverUrl: project.cover_url,
      images: (project.project_images ?? []).map((image) => ({
        url: image.image_url,
        alt: image.alt_text ?? `${project.title} — arte do projeto`,
      })),
    }))
  } catch {
    return localProjects
  }
}
