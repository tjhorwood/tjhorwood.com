import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Me',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
