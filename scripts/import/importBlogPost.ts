import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../../src/payload.config.ts';

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
const paragraph = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
});
const heading = (text: string, tag: 'h1' | 'h2' | 'h3') => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  type: 'heading',
  version: 1,
});
const quote = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'quote',
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

function markdownToLexical(body: string, title: string) {
  const start = body.indexOf(`# ${title}`);
  const postBody = start >= 0 ? body.slice(start) : body;
  const children: any[] = [];
  let buf: string[] = [];
  let inCode = false;
  let code: string[] = [];
  let codeLang = 'text';
  const flush = () => {
    if (!buf.length) return;
    const value = buf
      .map((line) => line.trim())
      .join(' ')
      .trim();
    if (value) children.push(paragraph(value));
    buf = [];
  };
  for (const raw of postBody.split('\n')) {
    const line = raw.replace(/\s+$/, '');
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
    if (!line.trim()) {
      flush();
      continue;
    }
    if (line.startsWith('# ')) {
      flush();
      children.push(heading(line.slice(2).trim(), 'h1'));
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

  const categories = await Promise.all(
    (data.categories || []).map(upsertCategory),
  );
  const tags = await Promise.all((data.tags || []).map(upsertTag));
  const content = markdownToLexical(body, title);
  const postData: any = {
    _status: 'draft',
    categories,
    content,
    excerpt: data.excerpt ?? '',
    externalId: data.externalId ?? `hermes-blog-${slug}`,
    publishedAt: null,
    seo: {
      description: data.metaDescription ?? data.excerpt ?? '',
      title: data.seoTitle ?? title,
    },
    slug,
    tags,
    title,
    visibility: 'public',
  };
  const existing = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });
  const doc = existing.docs[0]
    ? await payload.update({
        collection: 'posts',
        data: postData,
        draft: true,
        id: existing.docs[0].id,
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
