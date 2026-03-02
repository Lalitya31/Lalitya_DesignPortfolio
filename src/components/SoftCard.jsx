import { motion } from 'framer-motion'

export default function SoftCard({ children, className = '', onClick, glowColor = 'rgba(95,168,255,0.2)' }) {
    return (
        <motion.div
            onClick={onClick}
            className={`relative overflow-hidden rounded-2xl ${className}`}
            style={{
                background: 'rgba(11,31,58,0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(95,168,255,0.14)',
                cursor: onClick ? 'pointer' : 'default',
            }}
            whileHover={onClick ? {
                scale: 1.025,
                boxShadow: `0 0 32px ${glowColor}, 0 8px 40px rgba(0,0,0,0.5)`,
                borderColor: 'rgba(95,168,255,0.35)',
            } : {
                boxShadow: `0 0 20px ${glowColor}`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            {/* Inner shimmer line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(95,168,255,0.4), transparent)',
                    pointerEvents: 'none',
                }}
            />
            {children}
        </motion.div>
    )
}
