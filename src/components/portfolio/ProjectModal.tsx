import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../types'

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey) }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div className="project-modal" role="dialog" aria-modal="true" aria-label={`Projeto ${project.title}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="project-modal__header" initial={{ y: -30 }} animate={{ y: 0 }}>
            <span>{project.number} / 07</span>
            <div><small>{project.category}</small><h2>{project.title}</h2></div>
            <button onClick={onClose} autoFocus>FECHAR <X /></button>
          </motion.div>
          <div className="project-modal__body">
            <p>{project.description}</p>
            <div className="project-modal__gallery">
              {project.images.map((image, index) => <img key={image.url} src={image.url} alt={image.alt} loading={index > 1 ? 'lazy' : 'eager'} />)}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
