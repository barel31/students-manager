import type { InputHTMLAttributes } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function FormField({
  label,
  className = '',
  ...props
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
      <input
        className={`rounded-md border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-black ${className}`}
        {...props}
      />
    </label>
  );
}
