import Container from '@/app/_components/container';
import { EXAMPLE_PATH } from '@/lib/constants';
import cn from 'classnames';

interface Props {
  preview?: boolean;
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b dark:bg-zinc-700', {
        'border-neutral-800 bg-neutral-800 text-white': preview,
        'border-neutral-300 bg-neutral-100': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-teal-300"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className="underline transition-colors duration-200 hover:text-blue-600"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
