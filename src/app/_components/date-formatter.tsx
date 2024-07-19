import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  dateString: string;
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'PPP (EEE)', { locale: ko })}</time>;
};

export default DateFormatter;
