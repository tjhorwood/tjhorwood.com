import { CodeBlock } from '@payloadcms/richtext-lexical';

export const CodeSnippet = CodeBlock({
  defaultLanguage: 'bash',
  languages: {
    bash: 'Bash',
    dockerfile: 'Dockerfile',
    js: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    markdown: 'Markdown',
    sql: 'SQL',
    text: 'Plain text',
    ts: 'TypeScript',
    tsx: 'TSX',
    yaml: 'YAML',
    yml: 'YAML',
  },
  slug: 'CodeSnippet',
});
