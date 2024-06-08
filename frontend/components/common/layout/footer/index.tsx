import Text from "../../text";

export default function Footer() {
  return (
    <footer className='flex shrink-0 w-full h-60 px-32 py-10 bg-default-color'>
      <div className='flex flex-col gap-2'>
        <Text variant='middle-title' color='white' content='스미스' />
        <div className='flex flex-col gap-1'>
          <Text color='white' content='이메일: jeonjeunghoon@gmail.com' />
        </div>
      </div>
    </footer>
  );
}
