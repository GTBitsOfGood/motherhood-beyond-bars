import React from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function ChildModal({
  setModal,
  onSubmit,
  caretakers,
  buttonText = "Add a Child",
  header = "Add a Child",
  values,
}: {
  setModal: (modal: boolean) => void;
  onSubmit: (data: any) => void;
  caretakers: { name: string; id: string }[];
  buttonText?: string;
  header?: string;
  values?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(values);

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-bold">{header}</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setModal(false)}
              >
                <FaTimes onClick={() => setModal(false)} />
              </button>
            </div>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group mb-6">
                    <label className="text-sm">First Name</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="First name"
                      defaultValue={values?.firstName}
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Last Name</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Last name"
                      defaultValue={values?.lastName}
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Date of Birth</label>
                    <input
                      type="datetime-local"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Date of Birth"
                      defaultValue={values?.dob && values?.dob.slice(0, -8)}
                      {...register("dob", { required: true })}
                    />
                    {errors.dob && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Sex</label>
                    <select
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      defaultValue={values?.sex}
                      {...register("sex", { required: true })}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Caretaker</label>
                    <select
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      {...register("caretakerID", { required: true })}
                      defaultValue={values?.caretaker}
                    >
                      {caretakers.map((caretaker) => (
                        <option key={caretaker.id} value={caretaker.id}>
                          {caretaker.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Mother Name</label>
                    <input
                      type={"text"}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="First, Last"
                      defaultValue={values?.motherName}
                      {...register("motherName", { required: true })}
                    />
                    {errors.motherName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Hospital of Birth</label>
                    <input
                      type={"text"}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Hospital of Birth"
                      defaultValue={values?.hospitalName}
                      {...register("hospitalName", { required: false })}
                    />
                  </div>
                  {values && values.id && (
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

              <div className="flex items-end w-full p-5 border-b border-solid border-gray-300 rounded-t ">
                <button
                  className="px-4 py-2 rounded-md text-md text-red-500 font-semibold"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`px-7 py-2 ml-2 rounded-md text-md text-black font-semibold ${
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChildModal;
