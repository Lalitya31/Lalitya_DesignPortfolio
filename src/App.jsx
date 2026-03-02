import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import SelectedWorkSection from './sections/SelectedWorkSection'
import DesignProcessSection from './sections/DesignProcessSection'
import AboutSkillsSection from './sections/AboutSkillsSection'
import { motion } from 'framer-motion'
import FloatingOrb from './components/FloatingOrb'
import ParticleBackground from './components/ParticleBackground'

function Footer() {
  return (
    <footer style={{
      padding: '4rem 2rem',
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(95,168,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        position: 'relative',
      }}>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#f0ecff',
            marginBottom: '4px',
          }}>Lalitya</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(240,236,255,0.4)' }}>
            UI/UX Designer · AI Interface Specialist
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Work', 'Process', 'About', 'Contact'].map(link => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(240,236,255,0.4)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >{link}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <a href="https://www.linkedin.com/in/lalitya-dodla-078aa5367/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(240,236,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>LinkedIn</a>
          <div style={{ fontSize: '0.78rem', color: 'rgba(240,236,255,0.3)' }}>
            © 2026 Lalitya. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Global pinned orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <ParticleBackground />
        <FloatingOrb size={700} color="#1e5eff" x="80%" y="10%" delay={1} opacity={0.07} />
        <FloatingOrb size={500} color="#5fa8ff" x="10%" y="80%" delay={3} opacity={0.07} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.15), transparent)', margin: '0 2rem' }} />

        <SelectedWorkSection />

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.15), transparent)', margin: '0 2rem' }} />

        <DesignProcessSection />

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.15), transparent)', margin: '0 2rem' }} />

        <AboutSkillsSection />

        <Footer />
      </div>
    </div>
  )
}
