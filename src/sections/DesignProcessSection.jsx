import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
    {
        number: '01',
        label: 'Understand',
        description: 'Deep-dive into user needs, domain context, and system constraints through research and stakeholder interviews.',
        icon: '◎',
    },
    {
        number: '02',
        label: 'Structure',
        description: 'Map information architecture, user flows, and system model. Define the design language and interaction grammar.',
        icon: '⊞',
    },
    {
        number: '03',
        label: 'Prioritize',
        description: 'Rank features by impact, feasibility, and user value. Align design decisions with core problem space.',
        icon: '↑',
    },
    {
        number: '04',
        label: 'Visualize',
        description: 'Craft high-fidelity interfaces in Figma — screens, components, states, micro-interactions, and design tokens.',
        icon: '✦',
    },
    {
        number: '05',
        label: 'Validate',
        description: 'Usability testing, heuristic analysis, and iteration loops to pressure-test assumptions against real users.',
        icon: '◈',
    },
]

export default function DesignProcessSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            id="process"
            ref={sectionRef}
            style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(95,168,255,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: '5rem', textAlign: 'center' }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '1rem',
                    }}>
                        <div style={{ width: 32, height: 1, background: 'rgba(95,168,255,0.5)' }} />
                        <span style={{
                            fontSize: '0.78rem',
                            color: '#5fa8ff',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}>Design Process</span>
                        <div style={{ width: 32, height: 1, background: 'rgba(95,168,255,0.5)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: '#f0ecff',
                        margin: '0 0 1rem 0',
                        letterSpacing: '-0.03em',
                    }}>
                        How I design for{' '}
                        <span style={{ color: '#5fa8ff' }}>intelligent systems</span>
                    </h2>
                    <p style={{ color: 'rgba(240,236,255,0.5)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        A structured framework for building interfaces that make AI comprehensible and human-centered.
                    </p>
                </motion.div>

                {/* Staged narrative — replace procedural timeline with philosophical stages */}
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'start' }}>
                        <div>
                            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Stage 1 — Signal Extraction</h3>
                            <p style={{ maxWidth: '68ch', margin: 0, lineHeight: 1.7, textAlign: 'left', color: 'rgba(240,236,255,0.85)' }}>Understanding domain context, data constraints, and user pressure points.</p>
                        </div>

                        <div>
                            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Stage 2 — Decision Framing</h3>
                            <p style={{ maxWidth: '68ch', margin: 0, lineHeight: 1.7, textAlign: 'left', color: 'rgba(240,236,255,0.85)' }}>Structuring outputs into actionable system responses that respect human decision-making and operational constraints.</p>
                        </div>

                        <div>
                            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Stage 3 — Interface Mapping</h3>
                            <p style={{ maxWidth: '68ch', margin: 0, lineHeight: 1.7, textAlign: 'left', color: 'rgba(240,236,255,0.85)' }}>Translating logic into interpretable interaction layers that reduce cognitive latency and increase trust.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
