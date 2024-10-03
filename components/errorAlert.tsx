import React, { ReactElement } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

function ErrorAlert({
  title,
  message,
}: {
  title: string;
  message: ReactElement;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex bg-red-300 max-w-sm mb-4">
        <div className="w-16 bg-red-600">
          <div className="p-4">
            <FaRegTimesCircle className="text-white text-4xl" />
          </div>
        </div>
        <div className="w-auto text-black opacity-75 items-center p-4">
          <span className="text-lg font-bold pb-4">{title}</span>
          <div className="leading-tight">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorAlert;
