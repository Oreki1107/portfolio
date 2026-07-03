import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const NODES = [
  { id: 'n1',  x: 72,  y: 142, accent: true  },
  { id: 'n2',  x: 188, y: 64,  accent: false },
  { id: 'n3',  x: 185, y: 224, accent: false },
  { id: 'n4',  x: 298, y: 130, accent: true  },
  { id: 'n5',  x: 296, y: 288, accent: false },
  { id: 'n6',  x: 412, y: 66,  accent: true  },
  { id: 'n7',  x: 414, y: 208, accent: false },
  { id: 'n8',  x: 476, y: 346, accent: false },
  { id: 'n9',  x: 124, y: 362, accent: false },
  { id: 'n10', x: 246, y: 414, accent: true  },
  { id: 'n11', x: 366, y: 384, accent: false },
  { id: 'n12', x: 68,  y: 286, accent: false },
]

const EDGES = [
  { from: 'n1',  to: 'n2',  hi: false },
  { from: 'n1',  to: 'n3',  hi: false },
  { from: 'n1',  to: 'n12', hi: false },
  { from: 'n2',  to: 'n4',  hi: true  },
  { from: 'n2',  to: 'n6',  hi: false },
  { from: 'n3',  to: 'n4',  hi: false },
  { from: 'n3',  to: 'n5',  hi: false },
  { from: 'n3',  to: 'n9',  hi: false },
  { from: 'n4',  to: 'n6',  hi: true  },
  { from: 'n4',  to: 'n7',  hi: true  },
  { from: 'n5',  to: 'n7',  hi: false },
  { from: 'n5',  to: 'n11', hi: false },
  { from: 'n6',  to: 'n7',  hi: false },
  { from: 'n7',  to: 'n8',  hi: false },
  { from: 'n7',  to: 'n11', hi: false },
  { from: 'n9',  to: 'n10', hi: false },
  { from: 'n9',  to: 'n12', hi: false },
  { from: 'n10', to: 'n11', hi: true  },
  { from: 'n11', to: 'n8',  hi: false },
  { from: 'n12', to: 'n5',  hi: false },
]

const GRID_DOTS = Array.from({ length: 9 }, (_, col) =>
  Array.from({ length: 8 }, (_, row) => ({ col, row, x: 28 + col * 58, y: 24 + row * 58 }))
).flat()

const DECORATIVE = [
  { x: 448, y: 136, delay: 1.9 },
  { x: 44,  y: 430, delay: 2.1 },
  { x: 324, y: 450, delay: 2.3 },
  { x: 492, y: 88,  delay: 1.7 },
  { x: 150, y: 32,  delay: 2.0 },
]

export function AIIllustration() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  useEffect(() => { setMounted(true) }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  // Dark: very muted, low contrast — sits behind content
  const gridDotColor  = isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'
  const edgeColor     = isDark ? 'rgba(255,255,255,0.08)' : '#CBD5E1'
  const nodeBase      = isDark ? '#161B22'                : '#F8FAFC'
  const nodeBorder    = isDark ? 'rgba(255,255,255,0.12)' : '#CBD5E1'
  const accentColor   = isDark ? '#4F8CFF'                : '#2563EB'
  const decoColor     = isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'

  const nodeById = (id: string) => NODES.find((n) => n.id === id)!

  return (
    <svg
      viewBox="0 0 524 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ maxWidth: 500 }}
    >
      {/* Grid backdrop */}
      {GRID_DOTS.map((d) => (
        <circle key={`g${d.col}-${d.row}`} cx={d.x} cy={d.y} r={1.5} fill={gridDotColor} />
      ))}

      {/* Edges */}
      {EDGES.map((e, i) => {
        const a = nodeById(e.from)
        const b = nodeById(e.to)
        return (
          <motion.path
            key={`e${i}`}
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            stroke={e.hi ? accentColor : edgeColor}
            strokeWidth={e.hi ? 1.5 : 1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: e.hi ? (isDark ? 0.45 : 0.65) : (isDark ? 0.3 : 0.45) }}
            transition={{ duration: 1.6, delay: 0.2 + i * 0.045, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={n.id}>
          {n.accent && (
            <motion.circle
              cx={n.x} cy={n.y} r={18}
              fill={accentColor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isDark ? 0.06 : 0.1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.07 }}
            />
          )}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.accent ? 8 : 5}
            fill={n.accent ? accentColor : nodeBase}
            stroke={n.accent ? 'none' : nodeBorder}
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: n.accent ? (isDark ? 0.7 : 1) : (isDark ? 0.5 : 1) }}
            transition={{ duration: 0.45, delay: 0.65 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
          />
          {n.accent && (
            <motion.circle
              cx={n.x} cy={n.y} r={14}
              fill="none"
              stroke={accentColor}
              strokeWidth={1}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: isDark ? 0.15 : 0.25 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.07 }}
            />
          )}
        </g>
      ))}

      {/* Decorative squares */}
      {DECORATIVE.map((sq, i) => (
        <motion.rect
          key={`deco${i}`}
          x={sq.x - 4} y={sq.y - 4}
          width={8} height={8} rx={1.5}
          fill={decoColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isDark ? 0.3 : 0.55, scale: 1 }}
          transition={{ duration: 0.4, delay: sq.delay }}
        />
      ))}

      {/* Label badges */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <rect x={340} y={290} width={76} height={24} rx={12}
          fill={isDark ? 'rgba(79,140,255,0.08)' : '#EEF2FF'}
          stroke={isDark ? 'rgba(79,140,255,0.2)' : '#BFDBFE'}
          strokeWidth={1}
        />
        <text x={378} y={306} textAnchor="middle" fill={isDark ? '#4F8CFF' : '#2563EB'}
          style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          ML Model
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.7 }}
      >
        <rect x={88} y={170} width={68} height={24} rx={12}
          fill={isDark ? 'rgba(79,140,255,0.08)' : '#EEF2FF'}
          stroke={isDark ? 'rgba(79,140,255,0.2)' : '#BFDBFE'}
          strokeWidth={1}
        />
        <text x={122} y={186} textAnchor="middle" fill={isDark ? '#4F8CFF' : '#2563EB'}
          style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          Data Node
        </text>
      </motion.g>
    </svg>
  )
}
