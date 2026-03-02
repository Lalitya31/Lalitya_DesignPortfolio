import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const panel = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.25 } },
}

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 200,
                    background: 'rgba(5,11,26,0.88)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                }}
            >
                <motion.div
                    variants={panel}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        maxWidth: '760px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'rgba(11,31,58,0.85)',
                        backdropFilter: 'blur(32px)',
                        WebkitBackdropFilter: 'blur(32px)',
                        border: '1px solid rgba(95,168,255,0.18)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        position: 'relative',
                        boxShadow: '0 0 60px rgba(95,168,255,0.12), 0 32px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Shimmer top */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.5), transparent)',
                    }} />

                    {/* Close */}
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            position: 'absolute', top: '1.25rem', right: '1.25rem',
                            background: 'rgba(95,168,255,0.08)',
                            border: '1px solid rgba(95,168,255,0.2)',
                            borderRadius: '50%', width: 36, height: 36,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#5fa8ff', fontSize: '1.1rem',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(95,168,255,0.2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(95,168,255,0.08)'}
                    >✕</button>

                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '4px 12px', borderRadius: '100px',
                            background: 'rgba(95,168,255,0.1)', border: '1px solid rgba(95,168,255,0.2)',
                            marginBottom: '1rem',
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fa8ff' }} />
                            <span style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: '0.72rem', color: '#5fa8ff', fontWeight: 500,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                            }}>{project.category}</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 700, color: '#e8f4ff', margin: '0 0 0.5rem 0',
                            letterSpacing: '-0.02em', lineHeight: 1.2,
                        }}>{project.title}</h2>
                        <p style={{ color: 'rgba(232,244,255,0.55)', fontSize: '0.95rem', margin: 0 }}>{project.overview}</p>

                        {/* Project link + attribution */}
                        {(project.link || project.repo) && (
                            <div style={{ marginTop: '0.75rem', display: 'flex', gap: 10, alignItems: 'center' }}>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <button style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(90deg,#5fa8ff,#3b7dd8)', border: 'none', color: '#072033', fontWeight: 700, cursor: 'pointer' }}>Visit project</button>
                                    </a>
                                )}
                                {project.repo && (
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#eaf6ff', textDecoration: 'none' }} aria-label="View repository">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="currentColor"/>
                                        </svg>
                                    </a>
                                )}
                                {project.externalCredit && (
                                    <div style={{ color: 'rgba(232,244,255,0.55)', fontSize: '0.82rem' }}>{project.externalCredit}</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Hero band */}
                    <div style={{
                        height: '140px', borderRadius: '14px',
                        background: project.gradient,
                        marginBottom: '2rem',
                        position: 'relative', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,11,26,0.3)' }} />
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2rem, 6vw, 4rem)',
                            fontWeight: 800, color: 'rgba(232,244,255,0.1)',
                            letterSpacing: '-0.04em', position: 'relative',
                        }}>{project.title}</span>
                    </div>

                    {/* Problem / Solution */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                        {[
                            { label: '01 — Problem', content: project.problem, icon: '⚠' },
                            { label: '02 — Solution', content: project.solution, icon: '✦' },
                        ].map(({ label, content, icon }) => (
                            <div key={label} style={{
                                padding: '1.25rem', borderRadius: '14px',
                                background: 'rgba(95,168,255,0.04)',
                                border: '1px solid rgba(95,168,255,0.1)',
                            }}>
                                <div style={{
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    color: '#5fa8ff', fontSize: '0.72rem', fontWeight: 500,
                                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
                                }}>{icon} {label}</div>
                                <p style={{ color: 'rgba(232,244,255,0.7)', fontSize: '0.88rem', margin: 0, lineHeight: 1.65 }}>{content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Impact */}
                    <div style={{
                        padding: '1.5rem', borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(30,94,255,0.08), rgba(95,168,255,0.06))',
                        border: '1px solid rgba(95,168,255,0.15)',
                    }}>
                        <div style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: '#5fa8ff', fontSize: '0.72rem', fontWeight: 500,
                            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
                        }}>✦ 03 — Impact</div>
                        <p style={{ color: 'rgba(232,244,255,0.75)', fontSize: '0.88rem', margin: 0, lineHeight: 1.65 }}>{project.impact}</p>
                    </div>

                    {/* Tags */}
                    {project.tags && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.5rem' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    padding: '4px 12px', borderRadius: '100px',
                                    background: 'rgba(95,168,255,0.07)',
                                    border: '1px solid rgba(95,168,255,0.15)',
                                    color: 'rgba(232,244,255,0.6)',
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: '0.72rem', letterSpacing: '0.06em',
                                }}>{tag}</span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
