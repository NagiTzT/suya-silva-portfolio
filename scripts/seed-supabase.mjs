import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const secretKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !secretKey) {
  throw new Error(
    'Defina SUPABASE_URL e SUPABASE_SECRET_KEY somente neste terminal antes de executar o seed.',
  )
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = path.join(rootDir, 'src', 'assets', 'portfolio')
const bucketName = 'portfolio'
const supabase = createClient(supabaseUrl, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const projects = [
  {
    title: 'Drinks', slug: 'drinks', category: 'Social Media', prefix: 'drinks', count: 4, cover: 1,
    description: 'Composições para bar e coquetelaria com atmosfera noturna, fotografia e tipografia expressiva.',
  },
  {
    title: 'Futebol', slug: 'futebol', category: 'Editorial', prefix: 'futebol', count: 6, cover: 1,
    description: 'Uma série sobre futebol e cultura brasileira com colagem, textura e narrativa editorial.',
  },
  {
    title: 'Padaria', slug: 'padaria', category: 'Social Media', prefix: 'padaria', count: 4, cover: 1,
    description: 'Direção visual leve e apetitosa para confeitaria, com cor, produto e personalidade.',
  },
  {
    title: 'Hair Care', slug: 'hair-care', category: 'Editorial', prefix: 'haircare', count: 4, cover: 1,
    description: 'Conteúdo educativo de beleza com fotografia sensorial e linguagem editorial sofisticada.',
  },
  {
    title: 'Design', slug: 'design', category: 'Conteúdo', prefix: 'design', count: 5, cover: 2,
    description: 'Comunicação sobre design e presença digital construída com colagens e contrastes.',
  },
  {
    title: 'Sushi', slug: 'sushi', category: 'Social Media', prefix: 'sushi', count: 4, cover: 3,
    description: 'Campanha gastronômica direta, vibrante e focada em desejo de consumo.',
  },
  {
    title: 'Odontologia', slug: 'odontologia', category: 'Social Media', prefix: 'odontologia', count: 4, cover: 2,
    description: 'Conteúdo de saúde com linguagem acolhedora, clareza informativa e presença visual.',
  },
]

const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets()
if (listBucketsError) throw listBucketsError

if (buckets.some((bucket) => bucket.name === bucketName)) {
  const { error } = await supabase.storage.updateBucket(bucketName, {
    public: true,
    allowedMimeTypes: ['image/webp'],
  })
  if (error) throw error
} else {
  const { error } = await supabase.storage.createBucket(bucketName, {
    public: true,
    allowedMimeTypes: ['image/webp'],
  })
  if (error) throw error
}

for (const [projectIndex, project] of projects.entries()) {
  const uploadedImages = []

  for (let imageIndex = 1; imageIndex <= project.count; imageIndex += 1) {
    const filename = `${project.prefix}-${imageIndex}.webp`
    const storagePath = `${project.slug}/${filename}`
    const file = await readFile(path.join(assetsDir, filename))
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, file, {
        contentType: 'image/webp',
        cacheControl: '31536000',
        upsert: true,
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(bucketName).getPublicUrl(storagePath)
    uploadedImages.push({ position: imageIndex - 1, image_url: data.publicUrl })
  }

  const coverUrl = uploadedImages[project.cover - 1].image_url
  const { data: savedProject, error: projectError } = await supabase
    .from('projects')
    .upsert(
      {
        title: project.title,
        slug: project.slug,
        category: project.category,
        description: project.description,
        cover_url: coverUrl,
        featured: projectIndex < 3,
        position: projectIndex,
      },
      { onConflict: 'slug' },
    )
    .select('id')
    .single()

  if (projectError) throw projectError

  const { error: deleteError } = await supabase
    .from('project_images')
    .delete()
    .eq('project_id', savedProject.id)

  if (deleteError) throw deleteError

  const rows = uploadedImages.map((image, imageIndex) => ({
    project_id: savedProject.id,
    image_url: image.image_url,
    alt_text: `${project.category} — ${project.title}, arte ${imageIndex + 1}`,
    position: image.position,
  }))
  const { error: imagesError } = await supabase.from('project_images').insert(rows)
  if (imagesError) throw imagesError

  console.log(`✓ ${project.title}: ${rows.length} imagens`)
}

console.log('Supabase populado com sucesso.')
