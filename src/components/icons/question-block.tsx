import { cn } from '@/lib/utils'
import { SVGProps } from 'react'

export default function QuestionBlock(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      className={cn(className, '')}
      {...rest}
      fill="white"
    >
      <path
        fill="currentColor"
        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24c0 1.08-.635 1.594-1.244 2.057c-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987c.59-.444.965-.736.965-1.371c0-.825-.628-1.168-1.314-1.168c-.803 0-1.253.478-1.342 1.134c-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927c0-.552.425-.94 1.01-.94c.609 0 1.028.388 1.028.94c0 .533-.42.927-1.029.927"
      ></path>
    </svg>
  )
}
