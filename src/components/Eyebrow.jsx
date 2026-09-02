import { labelClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

// Mono, uppercase, wide-tracked label used above section headings.
export default function Eyebrow({ as: Tag = 'p', className, children }) {
  return <Tag className={cn(labelClass, className)}>{children}</Tag>;
}
