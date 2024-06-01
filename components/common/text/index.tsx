interface Props {
  content: string;
}

export default function Text({ content }: Props) {
  return <p className='text-sm font-medium'>{content}</p>;
}
