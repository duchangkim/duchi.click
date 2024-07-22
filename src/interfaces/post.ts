export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
    alt: string;
  };
  content: string;
  preview?: boolean;
  alert?: {
    message: string;
    shows: boolean;
  };
  description: string;
}
