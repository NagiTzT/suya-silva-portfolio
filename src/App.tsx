import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Portfolio } from './components/sections/Portfolio'
import { Skills } from './components/sections/Skills'
import { useProjects } from './hooks/useProjects'

export default function App() {
  const projects = useProjects()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio projects={projects} />
        <Contact />
      </main>
    </>
  )
}
