'use client'

import { motion } from 'framer-motion'

interface QuestionBlockProps {
  className?: string
  animate?: boolean
}

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
}

export function QuestionBlock({
  className = 'h-12 w-12',
  animate = false,
}: QuestionBlockProps) {
  const SvgComponent = (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="256" height="256" fill="currentColor" />
      <path
        d="M128 170V169.929M128 148.571C128 116.429 150 123.571 150 98.5714C150 82.7919 136.568 70 120 70C106.567 70 95.1961 78.9072 91.3733 90.9813"
        stroke="hsl(var(--background))"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  if (animate) {
    return (
      <motion.div variants={floatVariants} animate="animate">
        {SvgComponent}
      </motion.div>
    )
  }

  return SvgComponent
}
