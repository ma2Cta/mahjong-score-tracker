import { ReactElement, ReactNode } from "react"

interface TypographyH2Props {
  children: ReactNode
  className?: string
}

const TypographyH2: React.FC<TypographyH2Props> =  ({ children, className }) => {
  const classNames = `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className || ''}`;

  return (
    <h2 className={classNames}>
      {children}
    </h2>
  )
}

export default TypographyH2;
