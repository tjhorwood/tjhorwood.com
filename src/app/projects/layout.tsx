import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project',
  description: 'My Projects',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
