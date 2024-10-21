import React from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function CaretakerModal({
  setModal,
  onSubmit,
  buttonText = "Add caretaker",
  header = "Add a Caregiver",
  values = {},
}: {
  setModal: (modal: boolean) => void;
  onSubmit: (data: any) => void;
  buttonText?: string;
  header?: string;
  values?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-60"
      onClick={handleClose}
    >
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 border-b border-gray-300 rounded-t">
              <h3 className="text-2xl font-bold">{header}</h3>
              <button
                className="bg-transparent border-0 text-black"
                onClick={handleClose}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="block p-6 rounded-lg shadow-lg max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  {["firstName", "lastName", "email", "phoneNumber"].map(
                    (field, index) => (
                      <div
                        key={field}
                        className={`form-group ${index % 2 === 0 ? "mr-3" : ""} mb-3 ${index === 2 || index === 3 ? "w-full col-span-2" : ""}`}
                      >
                        <label>
                          {field.charAt(0).toUpperCase() +
                            field.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                          defaultValue={values[field] ?? ""}
                          {...register(field, { required: true })}
                        />
                        {errors[field] && (
                          <span className="text-error-red">
                            This field is required
                          </span>
                        )}
                      </div>
                    )
                  )}
                  <div className="form-group flex justify-end w-full col-span-2 mt-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md text-md text-mbb-pink font-semibold"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-transparent hover:bg-mbb-pink text-mbb-pink font-semibold hover:text-white py-2 px-4 border border-mbb-pink hover:border-transparent rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {buttonText}
                    </button>
                  </div>
                  {values?.id && (
                    <input
                      type="hidden"
                      defaultValue={values.id}
                      {...register("id")}
                    />
                  )}
                </div>
                {isSubmitting && (
                  <div className="flex justify-center align-bottom">
                    <span className="font-semibold">Submitting...</span>
                    <BiLoaderCircle className="animate-spin" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaretakerModal;
