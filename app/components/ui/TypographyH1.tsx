import { ReactElement, ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
  className?: string;
}

const TypographyH1: React.FC<TypographyH1Props> = ({ children, className }) => {
  const classNames = `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className || ''}`;
  
  return (
    <h1 className={classNames}>
      {children}
    </h1>
  );
}

export default TypographyH1;
