import { FlickeringGrid } from '@/components/ui/flickering-grid'
import VibesStart from '@/components/vibes/vibes-start'

export default function VibesPage() {
  return (
    <div className="bg-backgroundPurple relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center py-32">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.25}
      />
      <VibesStart />
    </div>
  )
}
