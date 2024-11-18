interface Props {
  title: string;
  description: string;
  leftButton: string;
  rightButton: string;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export default function PopUpModal({
  title,
  description,
  leftButton,
  rightButton,
  onClickLeft,
  onClickRight,
}: Props) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center sm:items-center items-end z-50">
      <div className="bg-white rounded-t-lg sm:rounded-lg p-6 w-full sm:w-11/12 sm:max-w-md shadow-lg">
        <h2 className="text-black text-lg font-bold mb-2">{title}</h2>
        <p className="text-black text-base font-normal">{description}</p>
        <div className="flex justify-end space-x-4 pt-[20.80px]">
          <button
            onClick={() => {
              onClickLeft();
            }}
            className="text-mbb-pink bg-white rounded border border-mbb-pink px-4 pt-2 pb-[9px] text-base font-semibold w-1/2"
          >
            {leftButton}
          </button>
          <button
            onClick={() => {
              onClickRight();
            }}
            className="text-mbb-pink bg-white rounded border border-white px-4 pt-2 pb-[9px] text-base font-semibold w-1/2"
          >
            {rightButton}
          </button>
        </div>
      </div>
    </div>
  );
}
