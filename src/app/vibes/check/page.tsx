'use client'

import { useState } from 'react'
import { AlignmentQuiz } from '@/components/vibes/AlignmentQuiz'

import '../vibes.module.css'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

interface AlignmentScore {
  DEGEN: number
  REGEN: number
  BUILD: number
}

export default function VibesCheckPage() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [alignmentScore, setAlignmentScore] = useState<AlignmentScore | null>(
    null,
  )

  const handleQuizComplete = (scores: AlignmentScore) => {
    setAlignmentScore(scores)
    setQuizCompleted(true)
  }

  return (
    <div className="bg-backgroundPurple relative flex h-[calc(100vh-64px)] w-full flex-col items-center pt-32">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.25}
      />
      {!quizCompleted ? (
        <AlignmentQuiz
          onComplete={handleQuizComplete}
          className="alignment-quiz-card z-10"
        />
      ) : (
        <div className="z-10 space-y-16 text-center text-primary-foreground">
          <h2 className="text-6xl font-bold text-primary">¡Quiz completado!</h2>
          <div className="space-y-4">
            <p className="text-3xl font-medium">Tus resultados:</p>
            <ul className="text-4xl font-medium text-destructive">
              <li>DEGEN: {alignmentScore?.DEGEN}</li>
              <li>REGEN: {alignmentScore?.REGEN}</li>
              <li>BUILD: {alignmentScore?.BUILD}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
