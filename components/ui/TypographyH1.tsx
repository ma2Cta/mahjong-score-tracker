import { ReactElement, ReactNode } from "react"

interface TypographyH1Props {
  children: ReactNode
}

const TypographyH1: React.FC<TypographyH1Props> =  ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export default TypographyH1;
