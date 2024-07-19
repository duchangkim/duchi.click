import CoverImage from './cover-image';
import DateFormatter from './date-formatter';

import { PostTitle } from '@/app/_components/post-title';
import { type Author } from '@/interfaces/author';

interface Props {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
}

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
