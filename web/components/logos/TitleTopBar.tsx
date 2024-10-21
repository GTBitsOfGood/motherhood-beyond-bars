interface Props {
  title: string;
}

export default function TitleTopBar({ title }: Props) {
  return (
    <div className="hidden sm:flex flex-row justify-center items-center w-[23.5rem] h-[4.125rem] bg-custom-background sm:w-full sm:h-[5.1rem]">
      <div className="w-full text-center text-white text-lg font-semibold mr-[2.813rem] sm:text-2xl sm:mr-5">
        {title}
      </div>
    </div>
  );
}
