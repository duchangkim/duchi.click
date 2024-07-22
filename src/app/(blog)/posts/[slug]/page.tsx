import Alert from '@/app/_components/alert';
import Container from '@/app/_components/container';
import { PostBody } from '@/app/_components/post-body';
import { PostHeader } from '@/app/_components/post-header';
import PostNotFound from '@/app/_components/post-not-found';
import ScrollbarWidthSetter from '@/app/_components/use-scrollbar-width-setter';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const Comments: ComponentType<{}> = dynamic(() => import('@/app/_components/comments'), {
  ssr: false,
});

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <PostNotFound />;
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <main className="pt-14">
      {post.alert?.shows && <Alert message={post.alert?.message} />}
      <Container>
        <article className="mb-32">
          <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} />
          <PostBody content={content} />
        </article>
        <section className="mx-auto flex max-w-[42rem] pb-14">
          <Comments />
        </section>
      </Container>
      <ScrollbarWidthSetter />
    </main>
  );
}

interface Params {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: Params): Metadata | undefined {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return;
  }

  const title = `${post.title} | Duchi. blog`;

  return {
    title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      images: [
        {
          url: post.ogImage.url,
          alt: post.ogImage.alt || '',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
