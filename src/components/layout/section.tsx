'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        'flex h-[calc(100vh-64px)] w-full flex-col items-center',
        'px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 xl:px-24',
        className,
      )}
    >
      <div className="w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
        {children}
      </div>
    </section>
  )
}
