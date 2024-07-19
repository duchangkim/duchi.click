import { PostPreview } from './post-preview';

import { Post } from '@/interfaces/post';

interface Props {
  posts: Post[];
}

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="sr-only">글 목록</h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
