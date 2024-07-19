import Container from '@/app/_components/container';
import { PostBody } from '@/app/_components/post-body';
import { PostHeader } from '@/app/_components/post-header';
import PostNotFound from '@/app/_components/post-not-found';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { Metadata } from 'next';

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <PostNotFound />;
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <main className="pt-14">
      {/* slug에서 alert 동적으로 처리하도록 수정해보기 */}
      {/* <Alert preview={post.preview} /> */}
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
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

  const title = `${post.title} | Duchi.`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
