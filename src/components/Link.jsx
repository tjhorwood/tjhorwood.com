import NextLink from 'next/link';

import { cn } from '@/lib/utils';

export default function Link(props) {
  const isExternal = !props.href.toString().startsWith('/');
  const { ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(props.className)}
      target={props.target ?? (isExternal ? '_blank' : undefined)}
      rel={props.rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
    >
      {props.children}
    </NextLink>
  );
}
