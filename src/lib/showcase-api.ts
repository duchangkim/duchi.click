import fs from 'fs';
import { join } from 'path';

import { Post } from '@/interfaces/post';
import matter from 'gray-matter';

const showcasesDirectory: string = join(process.cwd(), '_showcases');

export const getShowcaseSlugs = () => {
  return fs.readdirSync(showcasesDirectory);
};

export const getShowcaseItemBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(showcasesDirectory, `${realSlug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { ...data, slug: realSlug, content } as Post;
  } catch (e) {
    return null;
  }
};

export const getAllShowcases = (): Post[] => {
  const slugs = getShowcaseSlugs();
  const showcases = slugs
    .map((slug) => getShowcaseItemBySlug(slug))
    .filter((post) => post !== null)
    // sort showcases by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return showcases;
};
