import type { FC, ReactNode } from "react";

interface FieldLabelProps {
  children: ReactNode;
  label: string;
}

const FieldLabel: FC<FieldLabelProps> = ({ children, label }) => {
  return (
    <label className="flex flex-col w-full flex-initial py-2 px-1 gap-1">
      <span className="font-bold">{label}</span>
      {children}
    </label>
  );
};

export default FieldLabel;
