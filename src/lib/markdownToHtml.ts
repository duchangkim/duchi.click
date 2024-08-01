import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

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
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  return file.toString();
}
