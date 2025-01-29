'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'
import { useEffect, useState } from 'react'

interface ProofPoint {
  color: string
  description: string
  emoji: string
  type: string
}

const ProofPoint = ({ color, description, emoji }: ProofPoint) => {
  return (
    <figure
      className={cn(
        'relative flex min-h-fit w-full max-w-[400px] cursor-pointer rounded-2xl p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-card',
        // dark styles
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex aspect-square size-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{emoji}</span>
        </div>
        <div className="flex flex-col">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-wrap text-sm text-foreground sm:text-base">
              {description}
            </span>
          </figcaption>
        </div>
      </div>
    </figure>
  )
}

export default function HeroProofPointsList({
  className,
  proofPoints,
}: {
  className?: string
  proofPoints: ProofPoint[]
}) {
  const [randomizedItems, setRandomizedItems] = useState<ProofPoint[]>([])
  const shuffle = (array: ProofPoint[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Perform randomization after mount
  useEffect(() => {
    setRandomizedItems(shuffle(proofPoints))
  }, [proofPoints])

  // Show loading state until client-side randomization occurs
  if (!randomizedItems) {
    return null
  }

  return (
    <ScrollArea
      className={cn(
        'relative flex h-[300px] w-full flex-col overflow-y-scroll bg-transparent px-4 py-2 md:h-[480px] md:w-2/3 lg:h-[600px] lg:w-full',
        className,
      )}
    >
      <AnimatedList>
        {randomizedItems.map((item, idx) => (
          <ProofPoint {...item} key={idx} />
        ))}
      </AnimatedList>
    </ScrollArea>
  )
}
