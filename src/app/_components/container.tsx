import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div className={classNames('container mx-auto px-5', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
