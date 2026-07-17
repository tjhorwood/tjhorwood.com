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
    <figure className='not-prose my-6 overflow-hidden rounded-xl border border-primary/10 bg-primary/5'>
      <figcaption className='border-primary/10 border-b px-4 py-2 font-medium text-primary/60 text-xs uppercase tracking-[0.2em]'>
        {language}
      </figcaption>
      <pre className='overflow-x-auto p-4 text-sm leading-6'>
        <code>{code}</code>
      </pre>
    </figure>
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
        return <CodeSnippetBlock key={key} fields={node.fields} />;
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
    <div className='prose prose-neutral dark:prose-invert max-w-none'>
      {renderChildren(nodes)}
    </div>
  );
}
