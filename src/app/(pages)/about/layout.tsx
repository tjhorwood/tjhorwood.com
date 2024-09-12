import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'About Me',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
