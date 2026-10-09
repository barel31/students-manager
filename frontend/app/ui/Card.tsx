import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLElement>;

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl shadow-black/10 sm:p-8 ${className}`}
      {...props}>
      {children}
    </section>
  );
}
