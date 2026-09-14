import { lazy, Suspense, useState } from 'react'
import type { Project } from '../../types'
import { ProjectCard } from '../portfolio/ProjectCard'
import { Reveal } from '../ui/Reveal'

const ProjectModal = lazy(() => import('../portfolio/ProjectModal'))

export function Portfolio({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <section id="portfolio" className="portfolio section-cream">
      <div className="portfolio__intro">
        <div className="section-topline"><span>03 / SELECTED WORK</span><i /></div>
        <Reveal><h2>TRABALHOS<br />SELECIONADOS</h2></Reveal>
        <p>Projetos criados para transformar ideias em comunicação visual.</p>
      </div>
      <div className="portfolio__grid">
        {projects.slice(0, 3).map((project, index) => <ProjectCard key={project.id} project={project} className={`project-card--${index + 1}`} onOpen={() => setSelected(project)} />)}
      </div>
      <div className="manifesto" aria-label="Transformar experiências em histórias visuais">
        <span>COMUNICAÇÃO QUE CONECTA</span>
        <Reveal><p>TRANSFORMAR<br />EXPERIÊNCIAS EM<br /><em>HISTÓRIAS VISUAIS.</em></p></Reveal>
      </div>
      <div className="portfolio__grid portfolio__grid--second">
        {projects.slice(3).map((project, index) => <ProjectCard key={project.id} project={project} className={`project-card--${index + 4}`} onOpen={() => setSelected(project)} />)}
      </div>
      <Suspense fallback={null}><ProjectModal project={selected} onClose={() => setSelected(null)} /></Suspense>
    </section>
  )
}
