import type { FC, ReactElement, ReactNode } from "react";

/**
 * The props type for FieldLabel component.
 */
export interface FieldLabelProps {
  children: ReactNode;
  label: string;
}

/**
 * FieldLabel component
 * @category Component
 */
const FieldLabel: FC<FieldLabelProps> = ({ children, label }): ReactElement => {
  return (
    <label className="flex flex-col w-full flex-initial py-2 px-1 gap-1">
      <span className="font-bold">{label}</span>
      {children}
    </label>
  );
};

export default FieldLabel;
