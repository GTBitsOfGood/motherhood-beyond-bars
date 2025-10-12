interface Props {
  title: string;
  description: string;
  onClick: () => any;
}

export default function InfoCard({ title, description, onClick }: Props) {
  const action = () => {
    onClick();
  };

  return (
    <button
      onClick={action}
      className="flex flex-row justify-between items-center w-[20.438rem] h-full bg-white rounded shadow mt-3 p-3 sm:w-full sm:mb-6"
    >
      <div className="flex flex-col justify-start items-start sm:w-[20rem]">
        <div className="text-black text-lg font-bold sm:pb-1 sm:text-left">{title}</div>
        <div className="text-dark-gray text-left">{description}</div>
      </div>
      <img src="/KeyboardRightArrow.svg"></img>
    </button>
  );
}
