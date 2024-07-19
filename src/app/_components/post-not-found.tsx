import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-2 text-center text-3xl font-bold">404 - Post Not Found</h2>
      <p className="text-center text-lg">게시글을 찾을 수 없어요.</p>
      <Link href="/blog" replace>
        Blog
      </Link>
    </div>
  );
}
