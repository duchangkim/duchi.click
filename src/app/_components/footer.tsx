import Container from '@/app/_components/container';

export function Footer() {
  const today = new Date();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-800">
      <Container>
        <div className="flex flex-col py-7 text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {today.getFullYear()} duchi. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
