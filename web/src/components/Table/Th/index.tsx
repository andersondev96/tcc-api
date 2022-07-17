import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Th: React.FC<Props> = ({
  children
}) => {
  return (
    <th scope="col" className="py-3 px-6">
      {children}
    </th>
  );
}