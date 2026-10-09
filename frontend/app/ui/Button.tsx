import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export function buttonClassName(variant: ButtonVariant, className = '') {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500',
    secondary:
      'border border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800 focus-visible:ring-sky-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
  };

  return `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonClassName(variant, className)} {...props} />;
}
