import { HeroSection } from '@/components/landing/HeroSection'
import { BenefitsSection } from '@/components/landing/Benefits'
import FruteroStats from '@/components/landing/FruteroStats'
import BuilderJourney from '@/components/landing/BuilderJourney'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FruteroStats />
      <BuilderJourney />
    </>
  )
}
