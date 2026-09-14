import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'

export function ProjectCard({ project, className = '', onOpen }: { project: Project; className?: string; onOpen: () => void }) {
  return (
    <motion.article className={`project-card ${className}`} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
      <button onClick={onOpen} aria-label={`Ver projeto ${project.title}`}>
        <span className="project-card__image"><img src={project.coverUrl} alt={`${project.category} — ${project.title}`} loading="lazy" /><span className="project-card__hover">VER PROJETO <ArrowUpRight /></span></span>
        <span className="project-card__caption"><span>{project.category} — {project.title}</span><i /><span>{project.number} / 07</span><ArrowUpRight /></span>
      </button>
    </motion.article>
  )
}
