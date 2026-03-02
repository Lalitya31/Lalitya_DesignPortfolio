import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = ['Work', 'Process', 'About', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '0 2rem',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(5,11,26,0.88)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(95,168,255,0.1)' : 'none',
                transition: 'all 0.4s ease',
            }}
        >
            {/* Logo */}
            <motion.div
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
            >
                <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1e5eff, #5fa8ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: '0 0 16px rgba(95,168,255,0.35)',
                }}>L</div>
                <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#e8f4ff',
                    letterSpacing: '0.02em',
                }}>Lalitya</span>
            </motion.div>

            {/* Desktop links */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
                {navLinks.map((link) => (
                    <motion.button
                        key={link}
                        onClick={() => scrollTo(link)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(232,244,255,0.55)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            letterSpacing: '0.04em',
                            fontFamily: "'Inter', sans-serif",
                        }}
                        whileHover={{ color: '#5fa8ff' }}
                        transition={{ duration: 0.2 }}
                    >
                        {link}
                    </motion.button>
                ))}
                <motion.a
                    href="mailto:lalityadodla@gmail.com"
                    style={{
                        padding: '8px 20px',
                        borderRadius: '100px',
                        background: 'rgba(95,168,255,0.1)',
                        border: '1px solid rgba(95,168,255,0.25)',
                        color: '#5fa8ff',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                    }}
                    whileHover={{
                        background: 'rgba(95,168,255,0.2)',
                        boxShadow: '0 0 20px rgba(95,168,255,0.25)',
                    }}
                    transition={{ duration: 0.2 }}
                >
                    Hire Me
                </motion.a>
                <motion.a
                    href="https://www.linkedin.com/in/lalitya-dodla-078aa5367/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'transparent',
                        border: '1px solid rgba(95,168,255,0.08)',
                        color: 'rgba(240,236,255,0.8)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        cursor: 'pointer',
                    }}
                    whileHover={{ background: 'rgba(95,168,255,0.06)', color: '#5fa8ff' }}
                    transition={{ duration: 0.15 }}
                >
                    LinkedIn
                </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
                className="show-mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '4px',
                }}
            >
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 22, height: 2, background: '#5fa8ff', borderRadius: 2 }} />
                ))}
            </button>

            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'absolute',
                        top: '64px',
                        left: 0,
                        right: 0,
                        background: 'rgba(5,11,26,0.95)',
                        backdropFilter: 'blur(20px)',
                        padding: '1.5rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        borderBottom: '1px solid rgba(95,168,255,0.1)',
                    }}
                >
                    {navLinks.map(link => (
                        <button key={link} onClick={() => scrollTo(link)} style={{
                            background: 'none', border: 'none', color: 'rgba(232,244,255,0.75)',
                            fontSize: '1rem', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                        }}>{link}</button>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    )
}
