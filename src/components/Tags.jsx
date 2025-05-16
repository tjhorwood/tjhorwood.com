export default function Tags({ tags }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <span
          key={tag}
          className='rounded-md bg-neutral-200/50 px-4 py-2 font-medium shadow-md dark:bg-neutral-800'
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
