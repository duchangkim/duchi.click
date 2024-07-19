import Container from '@/app/_components/container';
import { MoreStories } from '@/app/_components/more-stories';
import ScrollbarWidthSetter from '@/app/_components/use-scrollbar-width-setter';
import { getAllPosts } from '@/lib/api';

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="pt-14">
      <Container>
        <MoreStories posts={allPosts} />
      </Container>
      <ScrollbarWidthSetter />
    </main>
  );
}
