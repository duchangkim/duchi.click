import Container from '@/app/_components/container';

export function Footer() {
  const today = new Date();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:border-slate-600 dark:bg-slate-800">
      <Container>
        <div className="text-slate-600 dark:text-slate-300 py-10 flex flex-col items-center">
          &copy; {today.getFullYear()} duchi. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
