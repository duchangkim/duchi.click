import Container from '@/app/_components/container';

export function Footer() {
  const today = new Date();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-800">
      <Container>
        <div className="flex flex-col items-center py-10 text-zinc-600 dark:text-zinc-300">
          &copy; {today.getFullYear()} duchi. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
