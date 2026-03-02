import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

function MonoText({ children, dim }) {
    return (
        <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: dim ? 'rgba(95,168,255,0.4)' : '#5fa8ff',
            letterSpacing: '0.1em',
            fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
        }}>{children}</span>
    )
}

export default function SystemIdentityScreen({ onComplete }) {
    const [glassVisible, setGlassVisible] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setGlassVisible(true), 1800)
        const t2 = setTimeout(onComplete, 4800)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [onComplete])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#050b1a',
                zIndex: 900,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                overflow: 'hidden',
            }}
        >
            <ParticleBackground />
            <div className="scanline" />

            {/* Radial glow behind content */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(30,94,255,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    maxWidth: '700px',
                    width: '100%',
                }}
            >
                {/* System label */}
                <motion.div variants={itemVariants} style={{ marginBottom: '1rem' }}>
                    <MonoText dim>SYSTEM / IDENTITY / v2026.03</MonoText>
                </motion.div>

                {/* Main OS name */}
                <motion.div variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
                    <h1
                        className="identity-text"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(4rem, 10vw, 8rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.06em',
                            lineHeight: 1,
                            background: 'linear-gradient(135deg, #e8f4ff 0%, #5fa8ff 50%, #1e5eff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            margin: 0,
                        }}
                    >
                        LALITYA.OS
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
                        color: 'rgba(95,168,255,0.5)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}>
                        INTERFACE DESIGN ENVIRONMENT
                    </div>
                </motion.div>

                {/* Version */}
                <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
                    <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.68rem',
                        color: 'rgba(95,168,255,0.3)',
                        letterSpacing: '0.2em',
                    }}>
                        v2026.03 — BUILD ALPHA
                    </div>
                </motion.div>

                {/* Taglines */}
                <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
                    <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)',
                        color: 'rgba(232,244,255,0.6)',
                        letterSpacing: '0.06em',
                        lineHeight: 2.2,
                    }}>
                        DESIGNING INTERPRETABLE SYSTEMS<br />
                        FOR REAL-TIME DECISION ENVIRONMENTS
                    </div>
                </motion.div>

                {/* Glass identity panel */}
                <AnimatePresence>
                    {glassVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            style={{
                                display: 'inline-flex',
                                gap: '2rem',
                                padding: '1.25rem 2.5rem',
                                borderRadius: '16px',
                                background: 'rgba(30,94,255,0.07)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(95,168,255,0.18)',
                                boxShadow: '0 0 40px rgba(95,168,255,0.1)',
                            }}
                        >
                            {[
                                { label: 'ROLE', value: 'HUMAN–AI INTERFACE ARCHITECT' },
                                { label: 'MODE', value: 'SYSTEM THINKING ENABLED' },
                            ].map(({ label, value }) => (
                                <div key={label} style={{ textAlign: 'left' }}>
                                    <div style={{
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: '0.6rem',
                                        color: 'rgba(95,168,255,0.4)',
                                        letterSpacing: '0.15em',
                                        marginBottom: '4px',
                                    }}>{label}</div>
                                    <div style={{
                                        fontFamily: "'IBM Plex Mono', monospace",
                                        fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
                                        color: '#5fa8ff',
                                        letterSpacing: '0.08em',
                                    }}>{value}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Transition indicator */}
                <motion.div
                    variants={itemVariants}
                    style={{ marginTop: '2.5rem' }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <MonoText dim>ENTERING PORTFOLIO ENVIRONMENT...</MonoText>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
