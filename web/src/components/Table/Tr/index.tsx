import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Tr: React.FC<Props> = ({
  children
}) => {
  return (
    <tr>
      {children}
    </tr>
  );
}