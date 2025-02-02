'use client'

import { useState } from 'react'
import { AlignmentQuiz } from '@/components/vibes/AlignmentQuiz'

import '../vibes.module.css'

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
    <main className="gradient-background flex min-h-screen items-center justify-center p-4">
      {!quizCompleted ? (
        <AlignmentQuiz
          onComplete={handleQuizComplete}
          className="alignment-quiz-card"
        />
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">¡Quiz completado!</h2>
          <p>Tus resultados:</p>
          <ul>
            <li>DEGEN: {alignmentScore?.DEGEN}</li>
            <li>REGEN: {alignmentScore?.REGEN}</li>
            <li>BUILD: {alignmentScore?.BUILD}</li>
          </ul>
        </div>
      )}
    </main>
  )
}
