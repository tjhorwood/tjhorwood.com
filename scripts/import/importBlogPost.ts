import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../../src/payload.config.ts';

type LexicalNode = Record<string, any>;

function getArg(name: string, fallback?: string) {
  const prefix = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback;
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match)
    throw new Error('Markdown file must start with YAML-style frontmatter');
  const [, raw, body] = match;
  const data: Record<string, any> = {};
  let current: string | null = null;
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const top = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (top) {
      const [, key, rawValue] = top;
      const value = rawValue.trim();
      if (!value) {
        data[key] = [];
        current = key;
      } else {
        data[key] = value.replace(/^"|"$/g, '');
        current = null;
      }
    } else if (current && line.trim().startsWith('-')) {
      data[current].push(line.trim().slice(1).trim());
    }
  }
  return { body, data };
}

const textNode = (text: string, format = 0) => ({
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  type: 'text',
  version: 1,
});

function inlineNodes(value: string) {
  const nodes: LexicalNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  for (const match of value.matchAll(pattern)) {
    if (match.index === undefined) continue;
    if (match.index > last)
      nodes.push(textNode(value.slice(last, match.index)));
    const token = match[0];
    if (token.startsWith('`')) nodes.push(textNode(token.slice(1, -1), 16));
    else if (token.startsWith('**'))
      nodes.push(textNode(token.slice(2, -2), 1));
    else nodes.push(textNode(token.slice(1, -1), 2));
    last = match.index + token.length;
  }
  if (last < value.length) nodes.push(textNode(value.slice(last)));
  return nodes.length ? nodes : [textNode(value)];
}

const paragraph = (text: string) => ({
  children: inlineNodes(text),
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
});
const heading = (text: string, tag: 'h1' | 'h2' | 'h3') => ({
  children: inlineNodes(text),
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  type: 'heading',
  version: 1,
});
const quote = (text: string) => ({
  children: inlineNodes(text),
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'quote',
  version: 1,
});
const listNode = (items: string[], ordered = false) => ({
  children: items.map((item, index) => ({
    children: inlineNodes(item),
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: ordered ? 'number' : 'bullet',
  start: 1,
  tag: ordered ? 'ol' : 'ul',
  type: 'list',
  version: 1,
});
const codeSnippet = (code: string, language: string) => ({
  fields: {
    blockName: '',
    blockType: 'CodeSnippet',
    code,
    id: crypto.randomUUID(),
    language: language || 'text',
  },
  format: '',
  type: 'block',
  version: 2,
});
const markdownTable = (headers: string[], rows: string[][]) => ({
  fields: {
    blockName: '',
    blockType: 'MarkdownTable',
    headers,
    id: crypto.randomUUID(),
    rows,
  },
  format: '',
  type: 'block',
  version: 2,
});

function isTableLine(line: string) {
  return /^\s*\|.*\|\s*$/.test(line);
}
function isSeparatorLine(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}
function splitTableLine(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function markdownToLexical(body: string, title: string) {
  const start = body.indexOf(`# ${title}`);
  const postBody = start >= 0 ? body.slice(start) : body;
  const lines = postBody.split('\n');
  const children: LexicalNode[] = [];
  let buf: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let inCode = false;
  let code: string[] = [];
  let codeLang = 'text';
  let skippedTitle = false;

  const flushList = () => {
    if (!listItems.length) return;
    children.push(listNode(listItems, listOrdered));
    listItems = [];
    listOrdered = false;
  };
  const flush = () => {
    flushList();
    if (!buf.length) return;
    const value = buf
      .map((line) => line.trim())
      .join(' ')
      .trim();
    if (value) children.push(paragraph(value));
    buf = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].replace(/\s+$/, '');
    const fence = line.match(/^```\s*([A-Za-z0-9_-]+)?\s*$/);
    if (fence) {
      if (inCode) {
        children.push(codeSnippet(code.join('\n'), codeLang));
        code = [];
        codeLang = 'text';
        inCode = false;
      } else {
        flush();
        inCode = true;
        code = [];
        codeLang = fence[1] || 'text';
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }

    if (
      isTableLine(line) &&
      i + 1 < lines.length &&
      isSeparatorLine(lines[i + 1])
    ) {
      flush();
      const headers = splitTableLine(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableLine(lines[i])) {
        rows.push(splitTableLine(lines[i]));
        i += 1;
      }
      i -= 1;
      children.push(markdownTable(headers, rows));
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }
    if (line.startsWith('# ')) {
      flush();
      const value = line.slice(2).trim();
      if (!skippedTitle && value === title) {
        skippedTitle = true;
        continue;
      }
      children.push(heading(value, 'h1'));
      continue;
    }
    if (line.startsWith('## ')) {
      flush();
      children.push(heading(line.slice(3).trim(), 'h2'));
      continue;
    }
    if (line.startsWith('### ')) {
      flush();
      children.push(heading(line.slice(4).trim(), 'h3'));
      continue;
    }
    if (line.startsWith('> ')) {
      flush();
      children.push(quote(line.slice(2).trim()));
      continue;
    }
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    const bullet = line.match(/^\s*-\s+(.+)$/);
    if (ordered || bullet) {
      if (buf.length) flush();
      const isOrdered = Boolean(ordered);
      if (listItems.length && listOrdered !== isOrdered) flushList();
      listOrdered = isOrdered;
      listItems.push((ordered?.[1] ?? bullet?.[1] ?? '').trim());
      continue;
    }
    if (listItems.length) flushList();
    buf.push(line);
  }
  flush();
  return {
    root: {
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function main() {
  const file = getArg('file');
  if (!file)
    throw new Error(
      'Usage: pnpm exec tsx scripts/import/importBlogPost.ts --file=/path/to/post.md',
    );
  const markdown = fs.readFileSync(path.resolve(file), 'utf8');
  const { body, data } = parseFrontmatter(markdown);
  const title = data.title;
  const slug = data.slug;
  if (!title || !slug)
    throw new Error('Frontmatter must include title and slug');
  const payload = await getPayload({ config });

  async function upsertCategory(name: string) {
    const existing = await payload.find({
      collection: 'categories',
      limit: 1,
      overrideAccess: true,
      where: { name: { equals: name } },
    });
    if (existing.docs[0]) return existing.docs[0].id;
    const cslug = slugify(name);
    const type =
      name.toLowerCase() === 'homelab'
        ? 'homelab'
        : ['self-hosting', 'devops-sre'].includes(cslug)
          ? 'post'
          : 'general';
    const doc = await payload.create({
      collection: 'categories',
      data: {
        externalId: `hermes-category-${cslug}`,
        name,
        slug: cslug,
        sortOrder: 0,
        type,
      },
      overrideAccess: true,
    });
    return doc.id;
  }
  async function upsertTag(name: string) {
    const existing = await payload.find({
      collection: 'technologies',
      limit: 1,
      overrideAccess: true,
      where: { name: { equals: name } },
    });
    if (existing.docs[0]) return existing.docs[0].id;
    const tslug = slugify(name);
    const doc = await payload.create({
      collection: 'technologies',
      data: {
        category: 'devops',
        displayGroup: 'skills',
        externalId: `hermes-tech-${tslug}`,
        featured: false,
        name,
        proficiency: 'working',
        slug: tslug,
        sortOrder: 0,
      },
      overrideAccess: true,
    });
    return doc.id;
  }

  const existing = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });
  const existingDoc = existing.docs[0] as any;
  const shouldPublish =
    existingDoc?._status === 'published' || Boolean(existingDoc?.publishedAt);
  const categories = await Promise.all(
    (data.categories || []).map(upsertCategory),
  );
  const tags = await Promise.all((data.tags || []).map(upsertTag));
  const content = markdownToLexical(body, title);
  const postData: any = {
    _status: shouldPublish ? 'published' : 'draft',
    categories,
    content,
    excerpt: data.excerpt ?? '',
    externalId: data.externalId ?? `hermes-blog-${slug}`,
    publishedAt: shouldPublish
      ? (existingDoc?.publishedAt ?? new Date().toISOString())
      : null,
    seo: {
      description: data.metaDescription ?? data.excerpt ?? '',
      title: data.seoTitle ?? title,
    },
    slug,
    tags,
    title,
    visibility: 'public',
  };
  const doc = existingDoc
    ? await payload.update({
        collection: 'posts',
        data: postData,
        draft: !shouldPublish,
        id: existingDoc.id,
        overrideAccess: true,
      })
    : await payload.create({
        collection: 'posts',
        data: postData,
        draft: true,
        overrideAccess: true,
      });
  console.log(
    JSON.stringify(
      {
        contentNodes: doc.content?.root?.children?.length,
        id: doc.id,
        publishedAt: doc.publishedAt,
        slug: doc.slug,
        status: doc._status,
      },
      null,
      2,
    ),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
