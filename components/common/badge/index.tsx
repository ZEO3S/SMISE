import Text from "../text";

interface Props {
  content: string;
}

export default function Badge({ content }: Props) {
  return (
    <div className='px-3 py-1 rounded-xl bg-default-color bg-opacity-10'>
      <Text variant='semi-base' content={content} />
    </div>
  );
}
