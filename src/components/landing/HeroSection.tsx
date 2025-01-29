'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Section } from '@/components/layout/section'
import HeroProofPointsList from './HeroProofPointsList'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ReactNode } from 'react'

interface HeroSectionProps {
  className?: string
}

const heroContent = {
  headline: {
    main: 'Vibes + Tech = Cultura Frutero 🍊',
    sub: 'Donde la Magia Sucede',
  },
  description: {
    main: 'No somos solo otra "comunidad" - somos LA comunidad donde los builders más rifados se juntan para crear el futuro, compartir conocimiento y crecer juntos.',
    secondary:
      '¿Qué hace especial a Frutero Club? Simple: combinamos los mejores vibes con la tecnología más innovadora. Aquí, las ideas locas se convierten en proyectos épicos, los novatos se transforman en hackers, y los sueños tech cobran vida.',
  },
  proofPoints: [
    {
      color: '#2C075C',
      description: 'La comunidad más cool con los vibes más rifados',
      emoji: '✨',
      type: 'Vibes',
    },
    {
      color: '#2435DE',
      description: 'Los builders que la rompen con startups y hackathones',
      emoji: '🚀',
      type: 'Builders',
    },
    {
      color: '#FF9900',
      description: 'Expertos en todo lo nuevo y trending: sin miedo al éxito',
      emoji: '🎩',
      type: 'Degens',
    },
    {
      color: '#26BF75',
      description: 'El mejor lugar para crecer, como personas y profesionales',
      emoji: '🍄',
      type: 'Regens',
    },
    {
      color: '#F5013D',
      description:
        'Encontramos el balance entre trabajo, bienestar y diversión',
      emoji: '🧘‍♀️',
      type: 'Zen',
    },
    {
      color: '#C4088F',
      description: 'Criptografía, gobernanza y reputación en cadena ',
      emoji: '🐸',
      type: 'Sage',
    },
  ],
  cta: {
    primary: 'Únete al Club',
    secondary: 'Explora nuestros Proyectos',
  },
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <Section className={cn('pt-16', className)}>
      {/* Background decoration - subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_40%)]" />

      {/* Main container */}
      <div className="container relative mx-auto">
        <div className="grid gap-4 md:gap-12 lg:grid-cols-2">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            {/* Headline */}
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground lg:-mt-10 lg:text-6xl xl:-mt-32">
              {heroContent.headline.main}
              <span className="mt-2 block text-2xl text-foreground sm:text-3xl">
                {heroContent.headline.sub}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-foreground">
              {heroContent.description.main}
            </p>

            {/* CTAs */}
            <div className="mt-10 hidden md:flex md:gap-2">
              <AuthButton className="w-2/3 bg-primary text-primary-foreground hover:bg-primary/90">
                {heroContent.cta.primary}
              </AuthButton>
              <Button
                size="lg"
                variant="outline"
                className="bg-background px-4"
              >
                {heroContent.cta.secondary}
              </Button>
            </div>
          </motion.div>

          {/* Proof Points */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroProofPointsList proofPoints={heroContent.proofPoints} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col items-center gap-4 md:hidden"
          >
            <AuthButton className="w-2/3 bg-primary text-primary-foreground hover:bg-primary/90">
              {heroContent.cta.primary}
            </AuthButton>
            <Button
              size="lg"
              variant="outline"
              className="w-2/3 bg-background hover:bg-accent/10 hover:text-accent"
            >
              {heroContent.cta.secondary}
            </Button>
          </motion.div>

          {/* Visual Column */}
          {/* Add hero image or animation here */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >

              {/* Placeholder for hero image/animation
            <div className="relative aspect-square w-full max-w-lg rounded-full bg-accent/10 lg:max-w-xl">
            </div>
          </motion.div> */}
        </div>
      </div>
    </Section>
  )
}

function AuthButton({
  className,
  children,
  size = 'lg',
}: {
  className?: string
  children: ReactNode
  size?: 'default' | 'sm' | 'lg'
}) {
  const { handleLogOut, setShowAuthFlow, sdkHasLoaded } = useDynamicContext()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  function login() {
    if (!isLoggedIn) {
      setShowAuthFlow(true)
    } else {
      toast.warning('ya cuentas con una sesión activa')
    }
  }
  async function logout() {
    await handleLogOut()
    router.push('/')
  }

  if (!sdkHasLoaded) {
    return null
  }

  return (
    <Button
      onClick={isLoggedIn ? logout : login}
      size={size}
      className={cn('font-medium', className)}
    >
      {children}
    </Button>
  )
}
