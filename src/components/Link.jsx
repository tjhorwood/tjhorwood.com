import cn from 'clsx';
import NextLink from 'next/link';

export default function Link(props) {
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
