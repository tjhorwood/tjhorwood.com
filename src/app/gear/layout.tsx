import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gear',
  description: 'My Gear',
};

export default function GearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
