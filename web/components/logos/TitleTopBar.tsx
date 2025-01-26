interface Props {
  title: string;
}

export default function TitleTopBar({ title }: Props) {
  return (
    <div className="hidden sm:flex flex-row justify-center items-center h-[4.125rem] bg-custom-background w-full sm:h-[5.1rem]">
      <div className="w-full text-center text-white text-lg font-semibold sm:text-2xl">
        {title}
      </div>
    </div>
  );
}
