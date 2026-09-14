import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const links = [
  ['home', 'Home'], ['sobre', 'Sobre mim'], ['skills', 'Skills'], ['portfolio', 'Portfólio'], ['contato', 'Contato'],
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-42% 0px -50% 0px' },
    )
    links.forEach(([id]) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const goTo = (id: string) => {
    const wasOpen = open
    setOpen(false)
    window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }, wasOpen ? 120 : 0)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <button className="navbar__brand" onClick={() => goTo('home')} aria-label="Ir para o início">SUYÁ SILVA</button>
      <nav className="navbar__links" aria-label="Navegação principal">
        {links.map(([id, label]) => <button key={id} className={active === id ? 'is-active' : ''} onClick={() => goTo(id)}>{label}</button>)}
      </nav>
      <button className="navbar__menu" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></button>
      {createPortal(
        open ? (
          <motion.div className="mobile-menu" initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}>
            <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button>
            <span className="eyeline">NAVEGAÇÃO / 2026</span>
            <nav aria-label="Navegação mobile">
              {links.map(([id, label], index) => <button key={id} onClick={() => goTo(id)}><small>0{index + 1}</small>{label}</button>)}
            </nav>
            <a href="https://instagram.com/suyadesign" target="_blank" rel="noreferrer">@suyadesign ↗</a>
          </motion.div>
        ) : null,
        document.body,
      )}
    </header>
  )
}
