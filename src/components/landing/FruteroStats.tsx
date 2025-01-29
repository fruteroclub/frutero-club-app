'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Section } from '../layout/section'

interface FruteroStatsSectionProps {
  className?: string
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Stats content configuration
const statsContent = {
  title: {
    main: 'El Impacto Frutero',
    sub: 'Construyendo el futuro del web3 en Latam y más allá',
  },
  stats: [
    {
      id: 'builders',
      icon: '👥',
      value: 223,
      suffix: '+',
      label: 'Builders Activos',
      description: 'Una comunidad vibrante y en crecimiento',
    },
    {
      id: 'countries',
      icon: '🌎',
      value: 12,
      label: 'Países',
      description: 'Presencia internacional en crecimiento',
    },
    {
      id: 'hackathons',
      icon: '🏆',
      value: 17,
      label: 'Hackathones Ganados',
      description: 'Reconocimientos internacionales',
    },
    {
      id: 'prizes',
      icon: '💰',
      prefix: '$',
      value: 25,
      suffix: 'K+',
      label: 'USD en Premios',
      description: 'Valor generado para la comunidad',
    },
  ],
  presence: {
    title: 'Presencia Global',
    countries: [
      'México',
      'Guatemala',
      'Honduras',
      'Holanda',
      'España',
      'Colombia',
      'Venezuela',
      'Perú',
      'Argentina',
      'Bolivia',
      'Costa Rica',
      'Estados Unidos',
    ],
  },
}

// CountUp component for animating numbers
function CountUp({
  end,
  prefix = '',
  suffix = '',
}: {
  end: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number
    const duration = 2000
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, isInView])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

// Stat Card component
function StatCard({
  icon,
  value,
  prefix,
  suffix,
  label,
  description,
}: {
  icon: string
  value: number
  prefix?: string
  suffix?: string
  label: string
  description: string
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <motion.span
            className="mb-4 block text-4xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.span>
          <h3 className="mb-2 text-3xl font-bold text-primary">
            <CountUp end={value} prefix={prefix} suffix={suffix} />
          </h3>
          <p className="mb-2 text-2xl font-medium text-foreground">{label}</p>
          <p className="text-lg text-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function FruteroStats({ className }: FruteroStatsSectionProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <Section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-primary/5 to-background',
        className,
      )}
    >
      {/* Background decoration */}
      <div className="bg-grid-primary/5 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container relative space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {statsContent.title.main}
          </h2>
          <p className="text-xl text-foreground sm:text-2xl">
            {statsContent.title.sub}
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statsContent.stats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </motion.div>

        {/* Countries Section */}
        <div className="text-center">
          <h3 className="mb-6 text-2xl font-bold">
            {statsContent.presence.title}
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-2"
          >
            {statsContent.presence.countries.map((country) => (
              <motion.div key={country} variants={itemVariants}>
                <Badge variant="secondary" className="text-sm">
                  {country}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
