import { Reveal } from '../ui/Reveal'

const skills = ['Adobe Illustrator', 'Adobe Photoshop', 'Design Criativo', 'Design Gráfico', 'Instagram', 'Mídias Sociais', 'Redes Sociais']

export function Skills() {
  const rail = skills.join('  ✦  ')
  return (
    <section id="skills" className="skills section-dark">
      <div className="section-topline"><span>02 / SKILLS</span><i /><span>FERRAMENTAS & LINGUAGENS</span></div>
      <Reveal><h2>SKILLS</h2></Reveal>
      <div className="marquee" aria-label={skills.join(', ')}><div>{rail} ✦ {rail}</div></div>
      <div className="marquee marquee--reverse" aria-hidden="true"><div>{rail} ✦ {rail}</div></div>
      <div className="skills__index">
        {skills.map((skill, index) => <div key={skill}><span>{String(index + 1).padStart(2, '0')}</span><p>{skill}</p></div>)}
      </div>
    </section>
  )
}
