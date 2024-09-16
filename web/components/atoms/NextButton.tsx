import { useAtom } from "jotai";
import { pageAtom } from "pages/caregiver/controls";
import { Dispatch, SetStateAction } from "react";

interface Props {
    disabled?: boolean
    onClick?: () => void
}

export default function NextButton({ disabled, onClick }: Props) {
    /* Button */

    const [page, setPage] = useAtom(pageAtom);
  return (
    <button
      className="bg-white border border-solid border-b-gray-300 rounded-[4px] box-border w-[400px] h-[45px] text-center gap-[8px]"
      onClick={() => {
        if (onClick) onClick();
        else setPage(page + 1);
      }}
      disabled={disabled}
    >
        Next
    </button>
  );
}
// /* Button */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 8px 16px 9px;
// gap: 8px;

// width: 400px;
// height: 45px;

// /* Light/Gray 100 */
// background: #FFFFFF;
// border: 1px solid #8C8C8C;
// border-radius: 4px;

// /* Inside auto layout */
// flex: none;
// order: 4;
// flex-grow: 0;
