import cn from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  children: ReactNode;
  className?: string;
} & NextLinkProps;

export default function Link(props: LinkProps) {
  const isExternal = !props.href.toString().startsWith('/');
  const { ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(props.className)}
      target={isExternal ? '_blank' : undefined}
      rel='noopener noreferrer'
    >
      {props.children}
    </NextLink>
  );
}
