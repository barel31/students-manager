import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonClassName, type ButtonVariant } from './Button';

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export default function LinkButton({
  href,
  children,
  variant = 'secondary',
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClassName(variant)}>
      {children}
    </Link>
  );
}
