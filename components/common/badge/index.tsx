interface Props {
  content: string;
}

export default function Badge({ content }: Props) {
  return (
    <div className='px-3 py-1 rounded-xl bg-default-color bg-opacity-10'>
      <p className='text-sm font-medium text-default-color text-opacity-70'>
        {content}
      </p>
    </div>
  );
}
