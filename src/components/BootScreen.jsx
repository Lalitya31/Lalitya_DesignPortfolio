import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const BOOT_LINES = [
    { text: 'INITIALIZING INTERFACE...', delay: 0 },
    { text: 'LOADING COGNITIVE MODULES...', delay: 900 },
    { text: 'ESTABLISHING HUMAN–AI ALIGNMENT...', delay: 1900 },
    { text: 'INTERPRETABILITY LAYER: ACTIVE', delay: 3000 },
    { text: 'SYSTEM READY', delay: 4200 },
]

// Typewriter hook
function useTypewriter(text, speed = 32) {
    const [displayed, setDisplayed] = useState('')
    useEffect(() => {
        setDisplayed('')
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1))
                i++
            } else {
                clearInterval(timer)
            }
        }, speed)
        return () => clearInterval(timer)
    }, [text, speed])
    return displayed
}

function BootLine({ text, autoStart = false }) {
    const [started, setStarted] = useState(autoStart)
    const displayed = useTypewriter(started ? text : '', 28)
    const done = displayed === text

    useEffect(() => {
        if (!autoStart) {
            const t = setTimeout(() => setStarted(true), 60)
            return () => clearTimeout(t)
        }
    }, [autoStart])

    return (
        <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)',
            color: '#5fa8ff',
            letterSpacing: '0.08em',
            lineHeight: 2,
            minHeight: '2em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
        }}>
            <span style={{ color: 'rgba(95,168,255,0.4)', marginRight: '6px' }}>›</span>
            {displayed}
            {!done && <span className="cursor-blink" />}
        </div>
    )
}

export default function BootScreen({ onEnter }) {
    const [visibleLines, setVisibleLines] = useState([])
    const [showPrompt, setShowPrompt] = useState(false)
    const [exiting, setExiting] = useState(false)

    // Reveal lines one by one based on delay
    useEffect(() => {
        const timers = BOOT_LINES.map((line, i) =>
            setTimeout(() => {
                setVisibleLines(prev => [...prev, i])
            }, line.delay)
        )
        // Show prompt after last line + time to type it
        const promptTimer = setTimeout(() => setShowPrompt(true), 5800)
        return () => {
            timers.forEach(clearTimeout)
            clearTimeout(promptTimer)
        }
    }, [])

    const handleEnter = useCallback(() => {
        if (!showPrompt || exiting) return
        setExiting(true)
        setTimeout(onEnter, 800)
    }, [showPrompt, exiting, onEnter])

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Enter') handleEnter()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [handleEnter])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#050b1a',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 'clamp(2rem, 8vw, 6rem)',
                overflow: 'hidden',
            }}
        >
            <ParticleBackground />
            <div className="scanline" />

            {/* Scan line sweep */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.6), transparent)',
                    boxShadow: '0 0 20px rgba(95,168,255,0.8)',
                    zIndex: 2,
                }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '700px', width: '100%' }}>
                {/* System label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.68rem',
                        color: 'rgba(95,168,255,0.4)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    <motion.div
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fa8ff' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    LALITYA.OS / BOOT_SEQUENCE_2026
                </motion.div>

                {/* Terminal lines */}
                <div style={{ marginBottom: '2rem' }}>
                    {BOOT_LINES.map((line, i) => (
                        <AnimatePresence key={i}>
                            {visibleLines.includes(i) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <BootLine
                                        text={line.text}
                                        autoStart={true}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ))}
                </div>

                {/* Progress bar */}
                {visibleLines.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <div style={{
                            height: '2px',
                            background: 'rgba(95,168,255,0.1)',
                            borderRadius: 2,
                            overflow: 'hidden',
                            width: '260px',
                        }}>
                            <motion.div
                                style={{ height: '100%', background: 'linear-gradient(90deg, #1e5eff, #5fa8ff)', borderRadius: 2 }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${(visibleLines.length / BOOT_LINES.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        </div>
                        <div style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '0.65rem',
                            color: 'rgba(95,168,255,0.35)',
                            marginTop: '6px',
                            letterSpacing: '0.1em',
                        }}>
                            {Math.round((visibleLines.length / BOOT_LINES.length) * 100)}% COMPLETE
                        </div>
                    </motion.div>
                )}

                {/* Press Enter prompt */}
                <AnimatePresence>
                    {showPrompt && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.button
                                onClick={handleEnter}
                                style={{
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)',
                                    color: '#5fa8ff',
                                    background: 'rgba(95,168,255,0.08)',
                                    border: '1px solid rgba(95,168,255,0.25)',
                                    borderRadius: '6px',
                                    padding: '10px 24px',
                                    cursor: 'pointer',
                                    letterSpacing: '0.1em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                                animate={{
                                    boxShadow: ['0 0 0px rgba(95,168,255,0)', '0 0 20px rgba(95,168,255,0.3)', '0 0 0px rgba(95,168,255,0)'],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                whileHover={{ background: 'rgba(95,168,255,0.15)', scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span style={{ color: 'rgba(95,168,255,0.5)' }}>⌨</span>
                                PRESS ENTER TO CONTINUE
                                <span className="cursor-blink" style={{ height: '0.8em' }} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Corner decorations */}
            {[
                { top: '1.5rem', left: '1.5rem', borderTop: true, borderLeft: true },
                { top: '1.5rem', right: '1.5rem', borderTop: true, borderRight: true },
                { bottom: '1.5rem', left: '1.5rem', borderBottom: true, borderLeft: true },
                { bottom: '1.5rem', right: '1.5rem', borderBottom: true, borderRight: true },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        borderStyle: 'solid',
                        borderColor: 'rgba(95,168,255,0.25)',
                        borderWidth: 0,
                        ...(pos.borderTop && { borderTopWidth: 1 }),
                        ...(pos.borderBottom && { borderBottomWidth: 1 }),
                        ...(pos.borderLeft && { borderLeftWidth: 1 }),
                        ...(pos.borderRight && { borderRightWidth: 1 }),
                        ...pos,
                    }}
                />
            ))}
        </motion.div>
    )
}
