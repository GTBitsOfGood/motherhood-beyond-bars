import Button from "@components/atoms/Button";
import React from "react";
import { FaTimes } from "react-icons/fa";

function DeleteProfileModal({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-60"
      onClick={onClose}
    >
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 border-b border-gray-300 rounded-t">
              <h3 className="text-2xl font-bold">Remove Profile</h3>
              <button
                className="bg-transparent border-0 text-black"
                onClick={onClose}
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-5">
              <h3> Are you sure you want to delete this profile? </h3>
              <div className="form-group flex justify-end w-full col-span-2 mt-5 text-mbb-pink font-semibold">
                <Button type="secondary" onClick={onClose} text="Cancel" />
                <Button submit text="Remove profile" onClick={onDelete} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProfileModal;
