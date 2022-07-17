import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Tbody: React.FC<Props> = ({
  children
}) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}