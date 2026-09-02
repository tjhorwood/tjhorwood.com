import React from 'react';

function renderTextNode(node, key) {
  let content = node.text ?? '';
  if (node.format & 16) content = <code key={`${key}-code`}>{content}</code>;
  if (node.format & 1) content = <strong key={`${key}-bold`}>{content}</strong>;
  if (node.format & 2) content = <em key={`${key}-italic`}>{content}</em>;
  if (node.format & 8) content = <u key={`${key}-underline`}>{content}</u>;
  if (node.format & 4) content = <s key={`${key}-strike`}>{content}</s>;
  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderChildren(children = []) {
  return children.map((child, index) => renderNode(child, index));
}

function CodeSnippetBlock({ fields }) {
  const language = fields?.language || 'text';
  const code = fields?.code || '';
  return (
    <figure className='not-prose my-8 overflow-hidden rounded-xl border border-border bg-secondary'>
      <figcaption className='flex items-center justify-between border-border border-b px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
        <span>Code snippet</span>
        <span className='text-brand'>{language}</span>
      </figcaption>
      <pre className='overflow-x-auto p-4 font-mono text-xs leading-6 sm:text-sm'>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

function MarkdownTableBlock({ fields }) {
  const headers = Array.isArray(fields?.headers) ? fields.headers : [];
  const rows = Array.isArray(fields?.rows) ? fields.rows : [];
  if (!headers.length || !rows.length) return null;

  return (
    <div className='not-prose my-6 overflow-x-auto rounded-xl border border-border'>
      <table className='min-w-full border-collapse text-left text-sm'>
        <thead className='bg-secondary font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
          <tr>
            {headers.map((header, index) => (
              <th
                className='border-border border-b px-4 py-3 font-medium'
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr className='odd:bg-secondary/40' key={rowIndex}>
              {headers.map((_, cellIndex) => (
                <td
                  className='border-border border-b px-4 py-3 align-top last:border-b-0'
                  key={cellIndex}
                >
                  {row?.[cellIndex] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderNode(node, key) {
  if (!node) return null;
  if (node.type === 'text') return renderTextNode(node, key);

  const children = renderChildren(node.children);
  switch (node.type) {
    case 'heading': {
      const Tag = node.tag || 'h2';
      return <Tag key={key}>{children}</Tag>;
    }
    case 'paragraph':
      return <p key={key}>{children}</p>;
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>;
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return <Tag key={key}>{children}</Tag>;
    }
    case 'listitem':
      return <li key={key}>{children}</li>;
    case 'linebreak':
      return <br key={key} />;
    case 'block': {
      if (node.fields?.blockType === 'CodeSnippet') {
        return <CodeSnippetBlock fields={node.fields} key={key} />;
      }
      if (node.fields?.blockType === 'MarkdownTable') {
        return <MarkdownTableBlock fields={node.fields} key={key} />;
      }
      return null;
    }
    default:
      return children?.length ? (
        <React.Fragment key={key}>{children}</React.Fragment>
      ) : null;
  }
}

export default function RichText({ content }) {
  const nodes = content?.root?.children;
  if (!Array.isArray(nodes) || nodes.length === 0) return null;
  return (
    <div className='prose prose-neutral max-w-none overflow-hidden break-words prose-sm dark:prose-invert sm:prose-lg prose-headings:font-semibold prose-headings:tracking-tighter prose-a:font-medium prose-a:text-foreground prose-a:decoration-brand prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-brand prose-img:rounded-xl prose-img:border prose-img:border-border prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:font-normal prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-brand'>
      {renderChildren(nodes)}
    </div>
  );
}
