import Container from '@/app/_components/container';
import CoverImage from '@/app/_components/cover-image';
import DateFormatter from '@/app/_components/date-formatter';
import ScrollbarWidthSetter from '@/app/_components/use-scrollbar-width-setter';
import { getAllShowcases } from '@/lib/showcase-api';
import Link from 'next/link';

export default function ShowcasePage() {
  const allShowcases = getAllShowcases();

  return (
    <main className="pt-14">
      <Container>
        <section>
          <h2 className="sr-only">글 목록</h2>
          <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
            {allShowcases.map(({ slug, title, coverImage, date, excerpt }) => (
              <div key={slug}>
                <div className="mb-5">
                  <CoverImage slug={slug} title={title} src={coverImage} href={`/items/${slug}`} />
                </div>
                <h3 className="mb-3 text-3xl leading-snug">
                  <Link href={`/items/${slug}`} className="hover:underline">
                    {title}
                  </Link>
                </h3>
                <div className="mb-4 text-lg">
                  <DateFormatter dateString={date} />
                </div>
                <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <ScrollbarWidthSetter />
    </main>
  );
}
