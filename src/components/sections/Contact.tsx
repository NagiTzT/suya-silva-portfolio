import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const whatsapp = 'https://wa.me/5547997840563?text=Ol%C3%A1%2C%20Suy%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.'

export function Contact() {
  return (
    <section id="contato" className="contact section-dark">
      <div className="section-topline"><span>04 / CONTATO</span><i /><span className="script">Suyá Silva</span></div>
      <Reveal><h2>VAMOS CRIAR<br /><em>ALGO JUNTOS?</em></h2></Reveal>
      <p className="contact__lead">Tem uma ideia para sua marca?<br />Me conta e vamos transformar isso em conteúdo.</p>
      <div className="contact__links">
        <a href={whatsapp} target="_blank" rel="noreferrer">FALAR PELO WHATSAPP <ArrowUpRight /></a>
        <a href="https://instagram.com/suyadesign" target="_blank" rel="noreferrer">SEGUIR NO INSTAGRAM <ArrowUpRight /></a>
      </div>
      <div className="contact__details"><p>Instagram<br /><strong>@suyadesign</strong></p><p>WhatsApp<br /><strong>(47) 99784-0563</strong></p></div>
      <footer><span>SUYÁ SILVA<br /><small>Designer Gráfica</small></span><span>© 2026 Suyá Silva</span><span>Criatividade • Precisão • Propósito</span></footer>
    </section>
  )
}
