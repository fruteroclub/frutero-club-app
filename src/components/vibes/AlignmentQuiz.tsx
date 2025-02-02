'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface AlignmentQuizProps {
  onComplete: (scores: AlignmentScore) => void
  className?: string
}

interface AlignmentScore {
  DEGEN: number
  REGEN: number
  BUILD: number
}

interface QuizFormData {
  question1: string
  question2: string
  question3: string
}

const quizContent = {
  title: 'Descubre tu Alineación Builder',
  description:
    'En Frutero Club, cada builder tiene su propia forma de crear impacto. ¿Cuál es la tuya?',

  alignments: [
    {
      type: 'DEGEN',
      emoji: '🚀',
      tagline: 'El Innovador Audaz',
      description:
        'Movimiento rápido, experimentación constante, siempre buscando la próxima gran cosa',
    },
    {
      type: 'REGEN',
      emoji: '🌱',
      tagline: 'El Constructor Sostenible',
      description:
        'Creando valor duradero, construyendo comunidad, enfocado en impacto positivo',
    },
    {
      type: 'BUILD',
      emoji: '⚡',
      tagline: 'El Maestro Técnico',
      description:
        'Sólidas bases técnicas, soluciones robustas, experticia en desarrollo',
    },
  ],

  questions: [
    {
      id: 'question1',
      question:
        'Es viernes por la noche. Tu stack favorito de tecnología acaba de lanzar una actualización revolucionaria. ¿Qué haces?',
      options: [
        {
          value: 'DEGEN',
          text: '¡Hackathon improvisado! Cancelo todos mis planes y me pongo a experimentar con las nuevas features',
        },
        {
          value: 'REGEN',
          text: 'Organizo un workshop comunitario para explorar juntos las nuevas posibilidades',
        },
        {
          value: 'BUILD',
          text: 'Analizo la documentación a fondo y planeo cómo integrarla en mis proyectos actuales',
        },
      ],
    },
    {
      id: 'question2',
      question:
        'Te encuentras con un problema técnico complejo en tu proyecto. ¿Cuál es tu enfoque?',
      options: [
        {
          value: 'DEGEN',
          text: 'Pruebo soluciones no convencionales, incluso si son arriesgadas',
        },
        {
          value: 'REGEN',
          text: 'Busco input de la comunidad y colaboro para encontrar una solución sostenible',
        },
        {
          value: 'BUILD',
          text: 'Investigo a fondo, analizo las mejores prácticas y construyo una solución robusta',
        },
      ],
    },
    {
      id: 'question3',
      question: '¿Cómo defines el éxito en tus proyectos?',
      options: [
        {
          value: 'DEGEN',
          text: 'Innovación disruptiva y crecimiento exponencial',
        },
        {
          value: 'REGEN',
          text: 'Impacto positivo duradero en la comunidad y el ecosistema',
        },
        {
          value: 'BUILD',
          text: 'Excelencia técnica y soluciones escalables de alta calidad',
        },
      ],
    },
  ],
}

const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },

  option: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
}

export function AlignmentQuiz({ onComplete, className }: AlignmentQuizProps) {
  const [step, setStep] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<QuizFormData>()
  const watchAllFields = watch()

  const onSubmit = (data: QuizFormData) => {
    const scores: AlignmentScore = {
      DEGEN: 0,
      REGEN: 0,
      BUILD: 0,
    }

    Object.values(data).forEach((answer) => {
      scores[answer as keyof AlignmentScore]++
    })

    onComplete(scores)
  }

  const totalSteps = quizContent.questions.length + 1
  const progress = (step / (totalSteps - 1)) * 100

  const renderIntroduction = () => (
    <motion.div
      variants={animations.container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.h2
        variants={animations.item}
        className="text-center text-3xl font-bold"
      >
        {quizContent.title}
      </motion.h2>
      <motion.p
        variants={animations.item}
        className="text-center text-muted-foreground"
      >
        {quizContent.description}
      </motion.p>
      <motion.div
        variants={animations.item}
        className="grid gap-4 md:grid-cols-3"
      >
        {quizContent.alignments.map((alignment) => (
          <Card key={alignment.type} className="overflow-hidden">
            <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
              <span className="text-4xl">{alignment.emoji}</span>
              <h3 className="font-semibold">{alignment.tagline}</h3>
              <p className="text-sm text-muted-foreground">
                {alignment.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
      <motion.div variants={animations.item} className="flex justify-center">
        <Button onClick={() => setStep(1)}>Comenzar Quiz</Button>
      </motion.div>
    </motion.div>
  )

  const renderQuestion = (questionIndex: number) => {
    const question = quizContent.questions[questionIndex - 1]
    return (
      <motion.div
        key={question.id}
        variants={animations.container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="space-y-6"
      >
        <motion.h3
          variants={animations.item}
          className="text-2xl font-semibold"
        >
          {question.question}
        </motion.h3>
        <RadioGroup
          {...register(question.id as keyof QuizFormData, { required: true })}
          className="space-y-4"
        >
          {question.options.map((option) => (
            <motion.div key={option.value} variants={animations.item}>
              <Label
                htmlFor={`${question.id}-${option.value}`}
                className="flex items-center space-x-3 space-y-0"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`${question.id}-${option.value}`}
                />
                <motion.span
                  variants={animations.option}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-grow cursor-pointer"
                >
                  {option.text}
                </motion.span>
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
        {errors[question.id as keyof QuizFormData] && (
          <motion.p variants={animations.item} className="text-red-500">
            Por favor, selecciona una opción
          </motion.p>
        )}
      </motion.div>
    )
  }

  return (
    <Card className={cn('mx-auto w-full max-w-3xl', className)}>
      <CardContent className="p-6 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 0 && renderIntroduction()}
            {step > 0 &&
              step <= quizContent.questions.length &&
              renderQuestion(step)}
          </AnimatePresence>

          {step > 0 && (
            <motion.div
              variants={animations.item}
              initial="hidden"
              animate="show"
              className="mt-8 space-y-4"
            >
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Anterior
                </Button>
                {step < quizContent.questions.length ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      !watchAllFields[`question${step}` as keyof QuizFormData]
                    }
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isValid}>
                    Finalizar
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
