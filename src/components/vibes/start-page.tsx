'use client'

import type React from 'react'
import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import QuestionBlock from '@/components/icons/question-block'

// Animation variants
const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const buttonVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

// const floatVariants = {
//   animate: {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Number.POSITIVE_INFINITY,
//       ease: 'easeInOut',
//     },
//   },
// }

const ParticleEffect: React.FC = () => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-destructive/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}

const QuestionMarkDecor: React.FC = () => {
  return (
    <div className="absolute select-none text-primary/20">
      <QuestionBlock className="h-24 w-24" />
    </div>
  )
}

export default function StartPage() {
  const controls = useAnimation()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '?') {
        controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 0.3 },
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [controls])

  return (
    <div className="flex h-full justify-center">
      <div className="space-y-16 text-center">
        {/* <QuestionMarkDecor /> */}
        <motion.h1
          className="glow-text text-7xl font-semibold text-destructive"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          ¿Quieres hackear y subir de nivel?
        </motion.h1>

        <div className="flex items-center justify-center gap-x-2 text-3xl font-medium text-primary-foreground">
          Presiona{' '}
          <QuestionBlockButton
            onClick={() =>
              controls.start({
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 },
              })
            }
          />{' '}
          para Iniciar
        </div>
      </div>
    </div>
  )
}

function QuestionBlockButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      aria-label="Presiona ? para Iniciar"
      className="inline-flex aspect-square h-16 w-16 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent text-5xl font-bold text-accent-foreground shadow transition-colors hover:bg-accent/75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      onClick={onClick}
    >
      ?
    </motion.button>
  )
}
