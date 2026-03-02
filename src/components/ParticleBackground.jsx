import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine)
    }, [])

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
            options={{
                fullScreen: false,
                background: { color: { value: 'transparent' } },
                fpsLimit: 60,
                particles: {
                    number: { value: 50, density: { enable: true, area: 1000 } },
                    color: { value: ['#5fa8ff', '#1e5eff', '#3b7dd8', '#a8d4ff'] },
                    shape: { type: 'circle' },
                    opacity: {
                        value: { min: 0.2, max: 0.5 },
                        animation: { enable: true, speed: 0.5, minimumValue: 0.2, sync: false },
                    },
                    size: {
                        value: { min: 1.5, max: 3.5 },
                        animation: { enable: true, speed: 1.2, minimumValue: 0.6, sync: false },
                    },
                    blur: { enable: true, value: 3 },
                    shadow: { enable: true, color: 'rgba(95,168,255,0.25)', blur: 8 },
                    move: {
                        enable: true,
                        speed: { min: 0.08, max: 0.35 },
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: { default: 'out' },
                        attract: { enable: false },
                    },
                    links: { enable: false },
                    twinkle: {
                        particles: { enable: true, frequency: 0.02, opacity: 0.5 },
                    },
                },
                detectRetina: true,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: 'bubble' },
                    },
                    modes: {
                        bubble: { distance: 120, size: 5, duration: 2, opacity: 0.6 },
                    },
                },
            }}
        />
    )
}
