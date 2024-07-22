import CoverImage from './cover-image';
import DateFormatter from './date-formatter';

import { PostTitle } from '@/app/_components/post-title';

interface Props {
  title: string;
  coverImage: string;
  date: string;
}

export function PostHeader({ title, coverImage, date }: Props) {
  return (
    <>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="mx-auto max-w-2xl">
        <div className="text-md mb-6 text-neutral-500 dark:text-neutral-400">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
