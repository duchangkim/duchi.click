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
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
