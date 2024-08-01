import { transformerCopyButton } from '@rehype-pretty/transformers';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeFormat from 'rehype-format';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      defaultLang: 'plaintext',
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeExternalLinks, {
      rel: ['nofollow', 'noopener', 'noreferrer'],
      target: (element) => {
        const href = element.properties?.href?.toString();

        return href?.startsWith('http') ? '_blank' : '_self';
      },
    })
    .use(remarkGfm)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  return file.toString();
}
