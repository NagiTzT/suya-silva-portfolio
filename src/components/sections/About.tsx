import portrait from '../../assets/portfolio/suya-portrait.webp'
import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <section id="sobre" className="about section-cream">
      <div className="section-topline"><span>01 / SOBRE</span><i /><span>CRIATIVIDADE · PRECISÃO · PROPÓSITO</span></div>
      <div className="about__grid">
        <Reveal className="about__visual">
          <img src={portrait} alt="Retrato de Suyá Silva" loading="lazy" />
          <h2>SOBRE<br />MIM</h2>
        </Reveal>
        <div className="about__content">
          <Reveal>
            <p>Olá! Que bom ter você por aqui.</p>
            <p>Sou designer especializada em artes para redes sociais. Meu objetivo é ajudar seu negócio a se destacar com um visual moderno e profissional.</p>
            <p>Posso te ajudar com: <strong>Artes para Posts e Stories.</strong></p>
            <p>Como posso ajudar sua marca hoje? Me conte sua ideia e vamos transformá-la em conteúdo!</p>
          </Reveal>
          <Reveal className="about__quote" delay={.1}>
            <p>É minha missão transformar experiências em histórias visuais através da criatividade, precisão e propósito.</p>
            <span className="script">Suyá Silva</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
