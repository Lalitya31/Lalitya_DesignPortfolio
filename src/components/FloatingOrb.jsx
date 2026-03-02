import { motion } from 'framer-motion'

export default function FloatingOrb({ size = 400, color = '#1e5eff', x = '50%', y = '50%', delay = 0, opacity = 0.12 }) {
    return (
        <motion.div
            aria-hidden="true"
            style={{
                width: size,
                height: size,
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
                filter: 'blur(56px)',
                position: 'absolute',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [opacity, opacity * 1.5, opacity],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    )
}
