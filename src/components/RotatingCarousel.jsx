import { useEffect, useState } from 'react'

export default function RotatingCarousel({ projects = [], autoAdvanceMs = 2000, onSelect, index: controlledIndex, onIndexChange }) {
    const [index, setIndex] = useState(controlledIndex ?? 0)

    useEffect(() => {
        if (typeof controlledIndex === 'number') return
        const id = setInterval(() => setIndex(i => (i + 1) % projects.length), autoAdvanceMs)
        return () => clearInterval(id)
    }, [projects.length, autoAdvanceMs, controlledIndex])

    useEffect(() => {
        if (typeof controlledIndex === 'number') setIndex(controlledIndex)
    }, [controlledIndex])

    const goTo = (i) => {
        const next = ((i % projects.length) + projects.length) % projects.length
        setIndex(next)
        onIndexChange?.(next)
    }

    if (!projects.length) return null

    return (
        <div style={{ position: 'relative', width: '100%', height: 360, perspective: 1200 }}>
            {projects.map((p, i) => {
                const offset = ((i - index) + projects.length) % projects.length
                // compute z and transform to bring one to front
                const isFront = offset === 0
                const zIndex = projects.length - offset
                const rotateY = isFront ? 0 : (offset *  -20)
                const translateZ = isFront ? 80 :  -60 - offset * 40
                const opacity = isFront ? 1 : 0.6
                const scale = isFront ? 1.04 : 0.86

                return (
                    <div
                        key={p.id}
                        onClick={() => { onSelect?.(p); goTo(i) }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center center',
                            transform: `translate(-50%,-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                            transition: 'transform 0.8s cubic-bezier(.2,.9,.2,1), opacity 0.5s ease',
                            zIndex,
                            width: '86%',
                            height: '84%',
                            borderRadius: 8,
                            background: p.gradient || 'rgba(255,255,255,0.02)',
                            color: '#eaf6ff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            boxShadow: isFront ? '0 30px 60px rgba(0,0,0,0.5)' : 'none',
                            overflow: 'hidden',
                            imageRendering: 'pixelated',
                            opacity,
                        }}
                    >
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.25rem' }}>{p.title}</div>
                        <div style={{ color: 'rgba(234,246,255,0.8)', marginTop: 6 }}>{p.overview}</div>
                    </div>
                )
            })}

            {/* pixel overlay to suggest initialization */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.12, backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='%23000000' opacity='0'/><rect x='0' y='0' width='1' height='1' fill='%23ffffff' opacity='0.18'/></svg>")`, backgroundSize: '8px 8px', borderRadius: 8 }} />
        </div>
    )
}
