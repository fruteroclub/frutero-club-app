import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'

interface FruteroButtonProps {
  href: string
  children: React.ReactNode
  variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined
}

export default function FruteroButton({ href, children, variant }: FruteroButtonProps) {

  function renderButton(href = "") {
    if (href) {
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={variant}>
            {children}
          </Button>
        </Link>)
    }
    else {
      return (
        <Button variant={variant}>
          {children}
        </Button>
      )
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex w-full justify-center"
    >
      {renderButton(href)}
    </motion.div>
  )
}

