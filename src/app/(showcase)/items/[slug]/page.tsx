import Alert from '@/app/_components/alert';
import Comments from '@/app/_components/comments';
import Container from '@/app/_components/container';
import DateFormatter from '@/app/_components/date-formatter';
import markdownStyles from '@/app/_components/markdown-styles.module.css';
import { PostTitle } from '@/app/_components/post-title';
import ScrollbarWidthSetter from '@/app/_components/use-scrollbar-width-setter';
import { getShowcaseItemBySlug } from '@/lib/showcase-api';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';

interface Params {
  params: {
    slug: string;
  };
}

export default async function ShowcaseItemPage({ params }: Params) {
  const showcaseItem = getShowcaseItemBySlug(params.slug);

  if (!showcaseItem) {
    return <div>not found</div>;
  }

  const { content } = await compileMDX({
    source: showcaseItem.content,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <main data-pagefind-body className="pt-14">
      {showcaseItem.alert?.shows && <Alert message={showcaseItem.alert?.message} />}
      <Container>
        <article className="mb-32">
          <PostTitle>{showcaseItem.title}</PostTitle>
          <div className="mx-auto max-w-2xl">
            <div className="text-md mb-6 text-neutral-500 dark:text-neutral-400">
              <DateFormatter dateString={showcaseItem.date} />
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className={markdownStyles.markdown}>{content}</div>
          </div>
        </article>
        <section className="mx-auto flex max-w-[42rem] pb-14">
          <Comments />
        </section>
      </Container>
      <ScrollbarWidthSetter />
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata | undefined {
  const showcaseItem = getShowcaseItemBySlug(params.slug);

  if (!showcaseItem) {
    return;
  }

  const title = `${showcaseItem.title} | Duchi. blog`;
  const keywords = showcaseItem.keywords || '';

  return {
    title,
    description: showcaseItem.description,
    keywords: keywords.split(','),
    openGraph: {
      title,
      description: showcaseItem.description,
      images: [
        {
          url: showcaseItem.ogImage.url,
          alt: showcaseItem.ogImage.alt || '',
        },
      ],
    },
  };
}

// export async function generateStaticParams() {
//   const showcases = getAllShowcases();

//   return showcases.map((showcaseItem) => ({
//     slug: showcaseItem.slug,
//   }));
// }
