import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import drinks from '../../assets/portfolio/drinks-1.webp'
import sushi from '../../assets/portfolio/sushi-2.webp'

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])

  return (
    <section id="home" ref={section} className="hero section-dark">
      <div className="hero__meta eyeline"><span>PORTFÓLIO<br />2026</span><i /></div>
      <motion.div className="hero__art hero__art--left" style={{ y: imageY }} initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.1, delay: .35, ease: [0.16, 1, 0.3, 1] }}>
        <img src={drinks} alt="Arte de coquetel criada por Suyá Silva" fetchPriority="high" />
      </motion.div>
      <motion.div className="hero__title" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .15, ease: [0.16, 1, 0.3, 1] }}>
        <h1><span>SUYÁ</span><span>SILVA</span></h1>
        <em>Suyá</em>
      </motion.div>
      <motion.div className="hero__art hero__art--right" style={{ y: imageY }} initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0)' }} transition={{ duration: 1.1, delay: .55, ease: [0.16, 1, 0.3, 1] }}>
        <img src={sushi} alt="Arte de sushi criada por Suyá Silva" />
      </motion.div>
      <div className="hero__role"><span>Designer Gráfica</span><i /></div>
      <div className="hero__scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={18} /></div>
    </section>
  )
}
