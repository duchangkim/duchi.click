import Container from '@/app/_components/container';
import cn from 'classnames';

interface Props {
  message?: string;
}

const Alert = ({ message }: Props) => {
  return (
    <div
      className={cn(
        'translate-y-[-3.5rem] border-b border-neutral-800 bg-neutral-800 text-white dark:bg-zinc-700',
      )}
    >
      <Container>
        <div className="py-2 text-center text-sm">{message}</div>
      </Container>
    </div>
  );
};

export default Alert;
