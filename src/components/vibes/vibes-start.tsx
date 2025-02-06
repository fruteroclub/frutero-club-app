'use client'

import type React from 'react'
import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'

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

const pressStartVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 30
  },
  animate: {
    opacity: [0, 1, 0], // Flashing effect
    scale: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      scale: {
        duration: 0.6,
        ease: "easeOut"
      },
      y: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
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

export default function VibesStart() {
  const controls = useAnimation()
  const router = useRouter()

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
    <div className="z-10 flex h-full justify-center">
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

        <motion.div variants={pressStartVariants} initial="initial"
          animate="animate" className="flex items-center justify-center gap-x-2 text-3xl font-medium text-primary-foreground">
          Presiona{' '}
          <QuestionBlockButton
            onClick={() => {
              controls.start({
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 },
              })
              router.push('/vibes/check')
            }}
          />{' '}
          para Iniciar
        </motion.div>
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
