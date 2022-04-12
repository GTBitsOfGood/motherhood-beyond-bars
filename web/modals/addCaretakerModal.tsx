import { CommunicationType } from "pages/caretakers";
import React from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function AddCaretakerModal({
  setModal,
  onSubmit,
}: {
  setModal: (modal: boolean) => void;
  onSubmit: (data: any) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-bold">Add a Caretaker</h3>
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
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Email</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Phone</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Phone"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group mb-6">
                    <label className="text-sm">Address</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Address"
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group mb-6">
                    <label className="text-sm">Apartment / Suite</label>
                    <input
                      type={"text"}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Apartment / Suite"
                      {...register("apartment", { required: false })}
                    />
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">City</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="City"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">State</label>
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="State"
                      {...register("state", { required: true })}
                    />
                    {errors.state && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Num of Adults</label>
                    <input
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Adults in household"
                      {...register("numAdults", { required: false })}
                    />
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Num of Children</label>
                    <input
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Dependant children"
                      {...register("numChildren", { required: false })}
                    />
                  </div>
                  <div className="form-group mb-6">
                    <label className="text-sm">Preferred Communication</label>
                    <select
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      {...register("prefferedCommunication", {
                        required: false,
                      })}
                    >
                      {(
                        Object.keys(CommunicationType) as Array<
                          keyof typeof CommunicationType
                        >
                      ).map((key) => {
                        return <option value={key}>{key}</option>;
                      })}
                    </select>
                  </div>
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
                  Add a Caretaker
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCaretakerModal;
