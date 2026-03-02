import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
    {
        category: 'UX Research',
        color: '#5fa8ff',
        skills: ['User Interviews', 'Contextual Inquiry', 'Heuristic Analysis', 'Journey Mapping'],
    },
    {
        category: 'Interaction Design',
        color: '#3b7dd8',
        skills: ['Micro-interactions', 'Prototyping', 'Information Architecture', 'Motion Design'],
    },
    {
        category: 'Design Systems',
        color: '#1e5eff',
        skills: ['Design Tokens', 'Component Libraries', 'Figma', 'Style Guides'],
    },
    {
        category: 'Usability Analysis',
        color: '#89c9ff',
        skills: ['A/B Testing', 'Cognitive Walkthrough', 'Accessibility Audit', 'Eye Tracking'],
    },
    {
        category: 'Tools & Code',
        color: '#2f6fe8',
        skills: ['Figma', 'GitHub', 'HTML/CSS', 'Framer'],
    },
    {
        category: 'Specialized',
        color: '#a8d4ff',
        skills: ['AI-assisted Interface Design', 'IoT Dashboard UX', 'XAI Visualization', 'Healthcare UX'],
    },
]

export default function AboutSkillsSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ padding: '8rem 0', position: 'relative' }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
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
                        }}>About</span>
                    </div>
                        <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: '#f0ecff',
                        margin: 0,
                        letterSpacing: '-0.03em',
                    }}>
                        The designer behind<br />
                        <span style={{ color: '#5fa8ff' }}>the interface</span>
                    </h2>
                </motion.div>

                {/* Split Panel */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    alignItems: 'start',
                }} className="about-grid">

                    {/* Left — About */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            padding: '2.5rem',
                            borderRadius: '24px',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Shimmer top */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.4), transparent)',
                        }} />

                        {/* Avatar */}
                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: 64,
                                height: 64,
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #1e5eff, #3b7dd8, #5fa8ff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: '#fff',
                                flexShrink: 0,
                                boxShadow: '0 0 30px rgba(95,168,255,0.3)',
                            }}>L</div>
                            <div>
                                <div style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1.15rem',
                                    color: '#f0ecff',
                                }}>Lalitya</div>
                                <div style={{ fontSize: '0.82rem', color: '#5fa8ff', fontWeight: 500 }}>UI/UX Designer</div>
                            </div>
                        </div>

                        <p style={{
                            color: 'rgba(240,236,255,0.75)',
                            fontSize: '0.95rem',
                            lineHeight: 1.8,
                            margin: '0 0 1.5rem 0',
                        }}>
                            I'm a UI/UX designer specializing in <strong style={{ color: '#5fa8ff' }}>interpretable interfaces for AI-assisted and real-time systems</strong>. My work lives at the intersection of human cognition and machine intelligence — I believe that great design should make AI legible, trustworthy, and genuinely useful.
                        </p>

                        <p style={{
                            color: 'rgba(240,236,255,0.6)',
                            fontSize: '0.92rem',
                            lineHeight: 1.8,
                            margin: '0 0 2rem 0',
                        }}>
                            From healthcare dashboards that surface life-critical signals to civic systems that serve millions — I approach every project with rigorous research, systemic thinking, and a deep commitment to the humans on the other side of the screen.
                        </p>

                        {/* Quote */}
                        <div style={{
                            padding: '1.25rem 1.5rem',
                            borderRadius: '12px',
                            background: 'rgba(95,168,255,0.07)',
                            border: '1px solid rgba(95,168,255,0.15)',
                            borderLeft: '3px solid #5fa8ff',
                            marginBottom: '2rem',
                        }}>
                            <p style={{
                                color: 'rgba(240,236,255,0.7)',
                                fontSize: '0.88rem',
                                lineHeight: 1.7,
                                margin: 0,
                                fontStyle: 'italic',
                            }}>
                                "Design is not decoration — it's the architecture of understanding. Every pixel should earn its place by serving the user's mental model."
                            </p>
                        </div>

                        {/* Contact */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <motion.a
                                id="contact"
                                href="mailto:lalityadodla@gmail.com"
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '100px',
                                            background: 'linear-gradient(135deg, #1e5eff, #3b7dd8)',
                                    color: '#fff',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                }}
                                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(95,168,255,0.4)' }}
                                whileTap={{ scale: 0.96 }}
                            >
                                Say Hello
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right — Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        style={{
                            padding: '2.5rem',
                            borderRadius: '24px',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Shimmer top */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.4), transparent)',
                        }} />

                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            color: '#f0ecff',
                            marginBottom: '1.75rem',
                        }}>Capabilities & Tools</div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {skillCategories.map((cat, i) => (
                                <motion.div
                                    key={cat.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '0.6rem',
                                    }}>
                                        <div style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: cat.color,
                                            boxShadow: `0 0 6px ${cat.color}`,
                                        }} />
                                        <span style={{
                                            fontSize: '0.72rem',
                                            color: cat.color,
                                            fontWeight: 700,
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                        }}>{cat.category}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {cat.skills.map(skill => (
                                            <motion.span
                                                key={skill}
                                                style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '100px',
                                                    background: `${cat.color}12`,
                                                    border: `1px solid ${cat.color}28`,
                                                    color: 'rgba(240,236,255,0.75)',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 500,
                                                    cursor: 'default',
                                                }}
                                                whileHover={{
                                                    background: `${cat.color}22`,
                                                    borderColor: `${cat.color}50`,
                                                    color: '#f0ecff',
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
