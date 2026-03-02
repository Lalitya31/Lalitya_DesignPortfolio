import { useEffect, useState, useRef } from 'react'

export default function StackedCarousel({ projects = [], intervalMs = 2400, onSelect }) {
    const [index, setIndex] = useState(0)
    const timerRef = useRef(null)

    // ensure pixel font is loaded (used by project links)
    useEffect(() => {
        if (typeof document === 'undefined') return
        if (!document.getElementById('press-start-2p')) {
            const link = document.createElement('link')
            link.id = 'press-start-2p'
            link.rel = 'stylesheet'
            link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
            document.head.appendChild(link)
        }
    }, [])

    useEffect(() => {
        if (!projects.length) return
        timerRef.current = setInterval(() => {
            setIndex(i => (i + 1) % projects.length)
        }, intervalMs)
        return () => clearInterval(timerRef.current)
    }, [projects.length, intervalMs])

    if (!projects.length) return null

    const n = projects.length

    return (
        <div style={{ position: 'relative', width: '100%', height: 340 }}>
            {projects.map((p, i) => {
                const offset = (i - index + n) % n
                const isFront = offset === 0
                const z = n - offset
                const translateY = offset * 20
                const leftOffset = 28 + offset * 16
                const width = 420
                const height = 140
                const scale = isFront ? 1.12 : 0.9
                const opacity = isFront ? 1 : 0.8
                const glow = isFront ? `0 12px 40px ${p.accentColor || 'rgba(95,168,255,0.22)'}` : 'none'

                return (
                    <div
                        key={p.id}
                        onClick={() => onSelect?.(p)}
                        style={{
                            position: 'absolute',
                            left: leftOffset,
                            top: 24 + translateY,
                            width,
                            height,
                            borderRadius: 12,
                            background: p.gradient || 'rgba(255,255,255,0.02)',
                            color: '#eaf6ff',
                            padding: '14px',
                            boxSizing: 'border-box',
                            boxShadow: isFront ? `0 30px 60px rgba(0,0,0,0.45), ${glow}` : '0 10px 26px rgba(0,0,0,0.36)',
                            transform: `scale(${scale})`,
                            transition: 'transform 0.7s cubic-bezier(.2,.9,.2,1), left 0.7s ease, top 0.7s ease, opacity 0.5s ease',
                            zIndex: z,
                            cursor: 'pointer',
                            overflow: 'hidden',
                            opacity,
                            imageRendering: 'pixelated',
                            fontFamily: "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
                            fontSize: '13px',
                            letterSpacing: '0.01em',
                        }}
                    >
                        <div style={{ fontWeight: 800, fontSize: '1.02rem', letterSpacing: '-0.01em' }}>{p.title}</div>
                        <div style={{ color: 'rgba(234,246,255,0.88)', fontSize: '0.92rem', marginTop: 8, lineHeight: 1.35 }}>{p.overview}</div>
                    </div>
                )
            })}
        </div>
    )
}
