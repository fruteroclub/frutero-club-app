'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Section } from '../layout/section'

interface BenefitsSectionProps {
  className?: string
}

export function BenefitsSection({ className }: BenefitsSectionProps) {
  return (
    <Section
      className={cn(
        'relative w-full overflow-hidden bg-background py-16 lg:py-24',
        className,
      )}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--secondary)/0.1),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="container relative space-y-8">
        {/* Section Header */}
        <motion.div
          variants={animations.item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {benefitsContent.title.main}
            <span className="mt-2 block text-xl text-secondary sm:text-2xl">
              {benefitsContent.title.sub}
            </span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={animations.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:px-24 lg:grid-cols-3 lg:px-0 xl:gap-12"
        >
          {benefitsContent.benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={animations.item}
              className="relative"
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="p-6">
                  {/* Icon */}
                  <span className="mb-4 block text-4xl">{benefit.icon}</span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-secondary">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-foreground">{benefit.description}</p>

                  {/* Features List */}
                  <ul className="mt-4 space-y-3 pl-4">
                    {benefit.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        variants={animations.feature}
                        className="flex items-center gap-2 text-card-foreground/80"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={animations.item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {benefitsContent.cta.text}
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}

const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },

  feature: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  },
}

const benefitsContent = {
  title: {
    main: 'Por qué Frutero Club',
    sub: 'Un tercer espacio donde los builders crecen',
  },

  benefits: [
    {
      id: 'community',
      icon: '🌟',
      title: 'Comunidad Elite',
      description:
        'Conéctate con los builders más rifados e innovadores del ecosistema web3.',
      features: [
        'Network internacional',
        'Cultura única tech + vibes',
        'Colaboración en proyectos reales',
        'Ambiente de crecimiento',
      ],
    },
    {
      id: 'growth',
      icon: '🚀',
      title: 'Crecimiento Acelerado',
      description:
        'De 0 a builder en tiempo récord con mentoría personalizada y recursos exclusivos.',
      features: [
        'Mentorías one-on-one',
        'Recursos técnicos premium',
        'Workshops prácticos',
        'Path probado de desarrollo',
      ],
    },
    {
      id: 'opportunities',
      icon: '💫',
      title: 'Oportunidades Reales',
      description:
        'Accede a oportunidades únicas para crecer profesionalmente en tech.',
      features: [
        'Hackathones internacionales',
        'Conexiones con fondos',
        'Lanzamiento de startups',
        'Proyectos remunerados',
      ],
    },
  ],

  cta: {
    text: 'Únete a la Comunidad',
    link: '#join',
  },
}
