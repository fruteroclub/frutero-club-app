'use client'

import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Section } from '../layout/section'
import { ChevronRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useRef } from 'react'

// Content configuration
const journeyContent = {
  title: {
    main: 'Tu Camino Como Builder',
    sub: 'De la idea al impacto: un journey de crecimiento continuo',
  },
  stages: [
    {
      id: 'discovery',
      icon: '💡',
      title: 'Encuentra tu Problema',
      description:
        'Identifica una necesidad real basada en tu propia experiencia',
      details: [
        'Aprende a identificar problemas reales',
        'Valida tus ideas con usuarios potenciales',
        'Define el valor único de tu solución',
      ],
      support: 'Mentorías de validación y design thinking',
    },
    {
      id: 'prototype',
      icon: '🛠',
      title: 'Construye tu Prototipo',
      description: 'Crea una versión inicial de tu solución en ciclos cortos',
      details: [
        'Reduce el alcance para iterar rápido',
        'Construye wireframes y MVPs',
        'Obtén feedback temprano',
      ],
      support: 'Mentoría técnica y de producto',
    },
    {
      id: 'validation',
      icon: '🎯',
      title: 'Consigue Usuarios',
      description: 'Valida tu solución con usuarios reales',
      details: [
        'Conecta con early adopters',
        'Recolecta feedback valioso',
        'Itera basado en datos reales',
      ],
      support: 'Acceso a comunidad y usuarios beta',
    },
    {
      id: 'growth',
      icon: '🚀',
      title: 'Escala tu Impacto',
      description: 'Crece tu proyecto y amplía tu alcance',
      details: [
        'Construye en público',
        'Desarrolla tu MVP completo',
        'Accede a financiamiento',
      ],
      support: 'Mentoría en growth y fundraising',
    },
  ],
  skills: {
    title: 'Habilidades que Desarrollarás',
    areas: [
      {
        name: 'Hacker',
        icon: '👨‍💻',
        skills: ['Desarrollo Web', 'LLMs + Agentes', 'Apps Web3', 'Full-Stack'],
      },
      {
        name: 'Hipster',
        icon: '🎨',
        skills: ['UI/UX', 'Design Thinking', 'Branding', 'User Research'],
      },
      {
        name: 'Hustler',
        icon: '🤝',
        skills: ['Growth', 'Pitching', 'Community', 'Business Dev'],
      },
    ],
  },
  support: {
    title: 'Apoyo Continuo',
    channels: [
      'Mentorías personalizadas 1:1',
      'Workshops técnicos',
      'Recursos exclusivos',
      'Comunidad activa',
    ],
  },
  cta: {
    text: 'Comienza tu Journey',
    link: '#join',
  },
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const stageVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

// Stage Card Component
function StageCard({
  stage,
  index,
}: {
  stage: (typeof journeyContent.stages)[0]
  index: number
}) {
  return (
    <motion.div variants={stageVariants} className="relative">
      {/* Connecting Line */}
      {index < journeyContent.stages.length - 1 && (
        <div className="absolute right-0 top-1/2 hidden h-[2px] w-8 bg-primary/20 lg:block" />
      )}

      <Card className="group h-full transition-shadow hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          {/* Stage Number and Icon */}
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {index + 1}
            </span>
            <motion.span
              className="text-3xl"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {stage.icon}
            </motion.span>
          </div>

          {/* Title and Description */}
          <h3 className="mb-2 font-bold text-primary">{stage.title}</h3>
          <p className="mb-4 text-lg text-foreground">{stage.description}</p>

          {/* Details Accordion */}
          <Accordion type="single" collapsible className="mt-auto w-full">
            <AccordionItem value="details" className="border-none">
              <AccordionTrigger className="text-sm hover:no-underline">
                Ver detalles
              </AccordionTrigger>
              <AccordionContent>
                <ul className="ml-4 list-disc space-y-1 text-base text-foreground">
                  {stage.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
                <p className="mt-2 text-sm font-medium text-primary">
                  {stage.support}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Skills Section Component
function SkillsSection() {
  return (
    <div className="mt-16">
      <h3 className="mb-8 text-center text-2xl font-bold text-secondary">
        {journeyContent.skills.title}
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {journeyContent.skills.areas.map((area) => (
          <motion.div key={area.name} variants={itemVariants}>
            <Card className="group h-full transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <motion.span
                  className="mb-4 block text-4xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {area.icon}
                </motion.span>
                <h4 className="mb-4 text-xl font-bold text-primary">
                  {area.name}
                </h4>
                <ul className="space-y-2">
                  {area.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <ChevronRight className="h-4 w-4 text-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Support Section Component
function SupportSection() {
  return (
    <div className="mt-16">
      <h3 className="mb-8 text-center text-2xl font-bold text-primary">
        {journeyContent.support.title}
      </h3>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {journeyContent.support.channels.map((channel) => (
          <motion.div key={channel} variants={itemVariants}>
            <Card className="group transition-shadow hover:shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-foreground">{channel}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function BuilderJourney({ className }: { className?: string }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <Section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-background to-secondary/5',
        className,
      )}
    >
      {/* Background decoration */}
      <div className="bg-grid-secondary/5 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container relative space-y-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {journeyContent.title.main}
          </h2>
          <p className="text-xl text-foreground sm:text-2xl">
            {journeyContent.title.sub}
          </p>
        </div>

        {/* Journey Stages */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {journeyContent.stages.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </motion.div>

        {/* Skills Section */}
        <SkillsSection />

        {/* Support Section */}
        <SupportSection />

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild>
            <a href={journeyContent.cta.link}>{journeyContent.cta.text}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
