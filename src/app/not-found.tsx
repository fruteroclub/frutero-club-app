import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-5xl flex h-[calc(100vh-64px)] flex-col items-center px-4 text-center">
      <h2 className="pt-40 text-5xl">404 | No encontrado</h2>
      <p className="mt-4 text-xl">
        ¡Parece que la página que buscas no existe!
      </p>
      <Link href="/">
        <Button
          size="lg"
          className="mt-6 text-lg md:mt-8 md:text-xl lg:mt-8 xl:mt-12"
        >
          Ir a inicio
        </Button>
      </Link>
    </div>
  )
}
