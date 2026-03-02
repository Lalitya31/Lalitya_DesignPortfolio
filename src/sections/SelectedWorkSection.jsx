import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import StackedCarousel from '../components/StackedCarousel'

const projects = [
    {
        id: 'innerhue',
        title: 'InnerHue',
        category: 'Mental Health UX',
        size: 'large',
        gradient: 'linear-gradient(135deg, #0b1f3a, #1a3a7a, #2d5fc9)',
        accentColor: '#5fa8ff',
        overview: 'A mood-tracking mental wellness app using color theory and interpretable AI to surface emotional insights.',
        problem: 'Users struggle to articulate mental states and existing apps lack nuance to surface meaningful patterns from subjective emotional data.',
        solution: 'Designed an ambient colour-coded journaling interface powered by AI sentiment analysis, with explainable AI highlights showing emotional trends.',
        impact: 'Reduced user drop-off by 40% in prototype testing. Users reported higher emotional clarity and the colour language became shared vocabulary in support groups.',
        tags: ['Figma', 'AI Sentiment', 'Color Theory', 'Accessibility', 'Emotion UX'],
        link: 'https://inner-hue.vercel.app/',
        externalCredit: 'Original project — redesigned by request',
    },
    {
        id: 'rushgrid',
        title: 'RushGrid',
        category: 'City Planning & Traffic Simulation',
        size: 'large',
        gradient: 'linear-gradient(135deg, #071830, #0d3060, #1a5098)',
        accentColor: '#5fa8ff',
        overview: 'A real-time city traffic command center for urban planners managing live simulations and anomaly detection at scale.',
        problem: 'Operations teams were overwhelmed by raw data streams with no actionable prioritization, causing delayed responses to traffic failures.',
        solution: 'Created a zoned dashboard with AI-powered anomaly surfacing. Critical events auto-escalate to a "focus rail" while routine data stays in secondary panels.',
        impact: 'Reduced average incident response time by 28%. Onboarding time for new ops staff dropped from 2 weeks to 3 days.',
        tags: ['Real-time UX', 'Data Visualization', 'AI Prioritization', 'B2B Design', 'Figma'],
        link: 'https://rushgridfinal.vercel.app/',
    },
    {
        id: 'uidai2026',
        title: 'UIDAI 2026',
        category: 'Gov. Digital ID',
        size: 'small',
        gradient: 'linear-gradient(135deg, #061525, #0d2a4a, #1a4a7a)',
        accentColor: '#5fa8ff',
        overview: 'Redesigned digital identity verification interface for UIDAI targeting accessibility and multilingual support.',
        problem: 'The existing Aadhaar interface was inaccessible to elderly users and those with low digital literacy, causing widespread authentication failures.',
        solution: 'Designed progressive disclosure model with voice-guided onboarding, high-contrast mode, and regional language switching. Simplified from 9 steps to 3.',
        impact: 'Projected 60% improvement in first-time verification for users above 55. Accessibility audit score improved from 38/100 to 91/100.',
        tags: ['Gov UX', 'Accessibility', 'Multilingual', 'Figma', 'Inclusive Design'],
        link: 'https://www.behance.net/gallery/245060749/UIDAI-26',
        repo: 'https://github.com/tanaymitra54/uidai',
    },
    {
        id: 'neopulse',
        title: 'NeoPulse',
        category: 'AI Health Monitor',
        size: 'small',
        gradient: 'linear-gradient(135deg, #070f28, #0e1e52, #1a3080)',
        accentColor: '#5fa8ff',
        overview: 'A wearable-connected health monitoring dashboard surfacing predictive alerts using interpretable AI models.',
        problem: "Healthcare professionals couldn't trust AI health alerts because reasoning was opaque — leading to alert fatigue and ignored warnings.",
        solution: 'Built explainable AI layer within the UI — each alert shows contributing biometric signals as a visual breakdown chart with confidence indicators.',
        impact: 'Clinical trust in AI alerts increased from 34% to 71% in usability studies. Alert response rate improved by 55% in pilot ward deployments.',
        tags: ['Healthcare UX', 'XAI', 'Wearables', 'Data Viz', 'Clinical Design'],
        link: 'https://www.youtube.com/watch?v=qWQqcY_4Wjc&feature=youtu.be',
    },
    {
        id: 'edge',
        title: 'EDGE',
        category: 'Burnout Predictor',
        size: 'small',
        gradient: 'linear-gradient(135deg, #050e22, #0b1e44, #122e68)',
        accentColor: '#5fa8ff',
        overview: 'An AI-powered burnout prediction and prevention interface monitoring workplace stress patterns in real time.',
        problem: 'Managers lacked early warning signals for team burnout until it was too late, with no systematic way to surface latent stress across distributed teams.',
        solution: 'Designed a role-adaptive dashboard surfacing burnout risk scores, contributing factors, and actionable intervention suggestions for team leads.',
        impact: 'Teams using EDGE reported 45% fewer burnout incidents. Early intervention rate improved by 62% within 3 months of deployment.',
        tags: ['Predictive UX', 'AI Dashboard', 'Workplace Health', 'Figma', 'B2B SaaS'],
        link: 'https://www.behance.net/gallery/245004343/EDGE',
        repo: 'https://github.com/Lalitya31/E.D.G.E',
    },
    {
        id: 'teamgenesis',
        title: 'Team Genesis',
        category: 'Introductory Website',
        size: 'small',
        gradient: 'linear-gradient(135deg, #070d24, #0d1c48, #162b6c)',
        accentColor: '#5fa8ff',
        overview: 'An introductory web presence for a cross-disciplinary design team showcasing collaborative identity and shared vision.',
        problem: 'The team had no central digital identity — individual profiles were scattered across platforms with inconsistent visual language and messaging.',
        solution: 'Built a minimal team introduction site with modular team-member cards, shared design principles section, and a collaborative work showcase. Note: All pages cannot be revealed due to organizational privacy of the undeployed website.',
        impact: 'Unified brand presence across 6 team members. Inbound collaboration requests increased 3× within the first month of launch.',
        tags: ['Brand Design', 'Team Website', 'Collaboration UX', 'HTML/CSS', 'Figma'],
        link: 'https://www.behance.net/gallery/245061063/Genesis-Website',
        repo: 'https://github.com/TeamGenesisVITC/GENESIS-Website',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function SelectedWorkSection() {
    const [selected, setSelected] = useState(null)
    const large = projects.filter(p => p.size === 'large')
    const small = projects.filter(p => p.size === 'small')

    return (
        <section id="work" style={{ padding: '6rem 0', position: 'relative' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 40, height: 1, background: 'rgba(95,168,255,0.3)' }} />
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#5fa8ff', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' }}>Selected Work</div>
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: 0, fontWeight: 700 }}>Editorial highlights — interfaces that <span style={{ color: 'var(--accent-mid)' }}>think with you</span></h2>
                </motion.div>

                {/* Editorial layout reduced: stacked carousel left + project links right (no feature/support boxes) */}
                <div>
                    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.14 }} style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
                            <div>
                                <StackedCarousel projects={projects.filter(p => p.id !== 'innerhue')} intervalMs={2400} onSelect={p => setSelected(p)} />
                            </div>
                            <aside style={{ padding: '8px 0' }}>
                                <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#5fa8ff', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem', marginBottom: 12 }}>Projects</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {projects.map(p => (
                                        <button key={p.id} onClick={() => setSelected(p)} style={{ background: 'transparent', border: 'none', textAlign: 'left', padding: '6px 8px', cursor: 'pointer', color: 'rgba(234,246,255,0.8)', fontWeight: 400, fontFamily: "'Press Start 2P', monospace", fontSize: '12px', lineHeight: 1.2 }} onMouseOver={e => e.currentTarget.style.color = '#9fd1ff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(234,246,255,0.8)'}>{'>'} {p.title}</button>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </motion.div>
                </div>
            </div>

            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </section>
    )
}
