import { useState } from "react";
import ErrorTriangle from "@components/Icons/ErrorTriangle";

interface Props {
  text?: string;
  onClose?: any;
}

export default function ErrorToast({ text, onClose }: Props) {
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setClosed(true);
    }
  };

  return (
    <>
      {!closed && (
        <div className="flex p-2 gap-2 items-center justify-between rounded border border-error-red">
          <div className="flex items-center gap-2">
            <ErrorTriangle />
            <p className="text-error-red text-sm">
              {text || "Please fill in all required fields."}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="cursor-pointer"
            onClick={handleClose}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.720011 0.720152C0.860631 0.579702 1.05126 0.500812 1.25001 0.500812C1.44876 0.500812 1.63938 0.579702 1.78001 0.720152L5.00001 3.94015L8.22001 0.720152C8.28871 0.646462 8.37151 0.587362 8.46351 0.546372C8.55551 0.505382 8.65481 0.483342 8.75551 0.481562C8.85621 0.479782 8.95621 0.498312 9.04961 0.536032C9.14301 0.573752 9.22781 0.629892 9.29901 0.701112C9.37031 0.772332 9.42641 0.857172 9.46411 0.950552C9.50181 1.04394 9.52041 1.14397 9.51861 1.24467C9.51681 1.34538 9.49481 1.44469 9.45381 1.53669C9.41281 1.62869 9.35371 1.71149 9.28001 1.78015L6.06001 5.00015L9.28001 8.22015C9.35371 8.28885 9.41281 8.37165 9.45381 8.46365C9.49481 8.55565 9.51681 8.65495 9.51861 8.75565C9.52041 8.85635 9.50181 8.95635 9.46411 9.04975C9.42641 9.14315 9.37031 9.22795 9.29901 9.29915C9.22781 9.37045 9.14301 9.42655 9.04961 9.46425C8.95621 9.50195 8.85621 9.52055 8.75551 9.51875C8.65481 9.51695 8.55551 9.49495 8.46351 9.45395C8.37151 9.41295 8.28871 9.35385 8.22001 9.28015L5.00001 6.06015L1.78001 9.28015C1.63783 9.41265 1.44978 9.48475 1.25548 9.48135C1.06118 9.47785 0.875801 9.39915 0.738381 9.26175C0.600971 9.12435 0.522261 8.93895 0.518831 8.74465C0.515401 8.55035 0.587531 8.36235 0.720011 8.22015L3.94001 5.00015L0.720011 1.78015C0.579561 1.63953 0.500671 1.4489 0.500671 1.25015C0.500671 1.0514 0.579561 0.860782 0.720011 0.720152Z"
              fill="#E60606"
            />
          </svg>
        </div>
      )}
    </>
  );
}
