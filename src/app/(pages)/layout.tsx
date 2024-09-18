export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-screen-2xl px-6 pb-24 pt-10 md:px-6 md:pb-44 md:pt-16'>
      <main className='grow'>{children}</main>
    </div>
  );
}
