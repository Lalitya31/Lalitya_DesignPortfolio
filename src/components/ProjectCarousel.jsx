import { useEffect, useRef, useState } from 'react'

export default function ProjectCarousel({ projects = [], autoAdvanceMs = 2000, onSelect }) {
    const [index, setIndex] = useState(0)
    const widthPercent = 100 // main visible card width
    const gapPercent = 60
    const trackRef = useRef(null)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % projects.length)
        }, autoAdvanceMs)
        return () => clearInterval(id)
    }, [projects.length, autoAdvanceMs])

    const goTo = (i) => {
        setIndex(((i % projects.length) + projects.length) % projects.length)
    }

    if (!projects.length) return null

    return (
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div
                            ref={trackRef}
                            style={{
                                display: 'flex',
                                transition: 'transform 0.6s ease',
                                transform: `translateX(calc(-${index} * (${widthPercent}% + ${gapPercent}%)))`,
                            }}
                        >
                            {projects.map((p, i) => (
                                <div
                                    key={p.id}
                                    onClick={() => onSelect?.(p)}
                                    style={{
                                        width: `${widthPercent}%`,
                                        marginRight: `${gapPercent}%`,
                                        borderRadius: 12,
                                        minHeight: 180,
                                        cursor: 'pointer',
                                        boxShadow: i === index ? '0 10px 30px rgba(0,0,0,0.45)' : 'none',
                                        transform: i === index ? 'scale(1.04)' : 'scale(0.98)',
                                        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                                        background: p.gradient || 'rgba(255,255,255,0.03)',
                                        color: '#eaf6ff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '1rem',
                                    }}
                                >
                                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{p.title}</div>
                                    <div style={{ color: 'rgba(234,246,255,0.7)', fontSize: '0.9rem' }}>{p.overview}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple nav controls */}
                    <div style={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)' }}>
                        <button onClick={() => goTo(index - 1)} style={{ background: 'transparent', border: 'none', color: '#cfe9ff', cursor: 'pointer', fontSize: 20 }}>‹</button>
                    </div>
                    <div style={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)' }}>
                        <button onClick={() => goTo(index + 1)} style={{ background: 'transparent', border: 'none', color: '#cfe9ff', cursor: 'pointer', fontSize: 20 }}>›</button>
                    </div>
                </div>
            </div>

            {/* System initialization box with optional links */}
            <aside style={{ width: 220, borderRadius: 12, padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.72rem', color: '#5fa8ff', fontWeight: 700, marginBottom: 8 }}>SYSTEM INITIALIZATION</div>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Boot Targets</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {projects.map((p, i) => (
                        <button key={p.id} onClick={() => goTo(i)} style={{ textAlign: 'left', background: 'transparent', border: 'none', color: i === index ? '#eaf6ff' : 'rgba(234,246,255,0.7)', cursor: 'pointer', padding: 6 }}>{p.title}</button>
                    ))}
                </div>
            </aside>
        </div>
    )
}
