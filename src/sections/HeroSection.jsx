import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.12, duration: 0.6, ease: 'easeOut' } }),
}

// Scanline CSS injected once
const scanlineCSS = `
@keyframes scanline {
  0%   { top: 0%; }
  100% { top: 100%; }
}
.hero-scanline {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: rgba(95,168,255,0.18);
  animation: scanline 4s linear infinite;
  pointer-events: none;
  z-index: 4;
}
`

export default function HeroSection() {
  const sectionRef = useRef(null)

  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const glowX = useTransform(mouseX, v => `${v}px`)
  const glowY = useTransform(mouseY, v => `${v}px`)

  function handleMove(e) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMove}
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '84px' }}
    >
      {/* inject scanline keyframes */}
      <style>{scanlineCSS}</style>

      {/* Layer 1 — ghost word DECISION far behind */}
      <div style={{
        position: 'absolute',
        left: '-6%',
        top: '18%',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 900,
        fontSize: '22vw',
        lineHeight: 1,
        letterSpacing: '-0.06em',
        color: '#e8f4ff',
        opacity: 0.025,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        whiteSpace: 'nowrap',
      }}>DECISION</div>

      {/* Layer 2 — interface window, partially off-screen right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
        style={{
          position: 'absolute',
          width: '120%',
          top: '12%',
          right: '-18%',
          height: '76%',
          transform: 'rotate(3deg)',
          background: 'linear-gradient(160deg,#060f28 0%,#0b2a56 45%,#123b7a 100%)',
          boxShadow: '0 40px 100px rgba(10,30,80,0.55)',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* status chip */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 22,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 12px',
          background: 'rgba(95,168,255,0.08)',
          border: '1px solid rgba(95,168,255,0.15)',
          borderRadius: 4,
          zIndex: 5,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fa8ff', boxShadow: '0 0 6px #5fa8ff' }} />
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#5fa8ff',
          }}>Interpretability Engine: Active</span>
        </div>

        {/* scanline */}
        <div className="hero-scanline" />

        {/* mock UI body */}
        <div style={{ position: 'absolute', inset: 62, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ width: 140, height: 32, borderRadius: 4, background: 'linear-gradient(90deg,#1343a8,#3b7dd8)' }} />
            <div style={{ width: 100, height: 32, borderRadius: 4, background: 'rgba(255,255,255,0.03)' }} />
            <div style={{ width: 70, height: 32, borderRadius: 4, background: 'rgba(255,255,255,0.02)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, flex: 1 }}>
            <div style={{ width: '34%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.025)' }} />
              <div style={{ height: '30%', borderRadius: 4, background: 'rgba(255,255,255,0.015)' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ flex: 2, borderRadius: 4, background: 'rgba(30,94,255,0.06)' }} />
              <div style={{ flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.02)' }} />
            </div>
            <div style={{ width: '24%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.02)' }} />
              <div style={{ height: 40, borderRadius: 4, background: 'rgba(95,168,255,0.06)' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Layer 3 — left-to-right scrim so text reads clearly over the window */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(5,11,26,0.92) 0%, rgba(5,11,26,0.55) 45%, transparent 72%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Layer 4 — typographic content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 84px)' }}>
        <div style={{ maxWidth: 620 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 6.8rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: 0,
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(180deg, #e8f4ff 0%, #5fa8ff 55%, #1e5eff 100%)',
              backgroundClip: 'text',
            }}>
              <motion.span custom={0} variants={lineVariants} style={{ display: 'block' }}>Interfaces that</motion.span>
              <motion.span custom={1} variants={lineVariants} style={{ display: 'block' }}>think with you</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'rgba(232,244,255,0.7)', marginTop: '1.25rem', maxWidth: 480 }}
            >
              Human–AI Interface Designer for real-time decision systems
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              style={{ marginTop: '2.4rem', display: 'flex', gap: '1rem', alignItems: 'center', transform: 'translateX(-6px)' }}
            >
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '14px 28px', borderRadius: 999, background: 'linear-gradient(135deg,var(--accent-start),var(--accent-mid))', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', boxShadow: '0 18px 48px rgba(30,94,255,0.18)' }}
              >
                View Work
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '12px 22px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(95,168,255,0.14)', color: 'rgba(232,244,255,0.8)', fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer' }}
              >
                About
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* cursor-follow glow */}
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }}>
        <div className="blob" />
      </motion.div>

      <div className="diagonal-divider" aria-hidden />
    </section>
  )
}
