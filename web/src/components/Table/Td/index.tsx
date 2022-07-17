import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Td: React.FC<Props> = ({
  children
}) => {
  return (
    <td className="py-4 px-6">
      {children}
    </td>
  );
}