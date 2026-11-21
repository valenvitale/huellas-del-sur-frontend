import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({
  label,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();

  return (
    <div className="form-field">
      <label htmlFor={id ?? generatedId}>{label}</label>
      <input id={id ?? generatedId} {...props} />
    </div>
  );
}
