import { useEffect, useState } from 'react'
import { localProjects } from '../data/projects'
import { loadProjects } from '../lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState(localProjects)

  useEffect(() => {
    let active = true
    void loadProjects().then((items) => {
      if (active) setProjects(items)
    })
    return () => { active = false }
  }, [])

  return projects
}
