import SearchableDropdown from "@components/atoms/SearchInput";
import { getCaregivers } from "db/actions/admin/Caregiver";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

interface CaregiverOption {
  label: string;
  value: any;
}

function ChildModal({
  setModal,
  onSubmit,
  buttonText = "Add child",
  header = "Add a Child",
  values,
}: {
  setModal: (modal: boolean) => void;
  onSubmit: (data: any) => void;
  buttonText?: string;
  header?: string;
  values?: any;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [caregivers, setCaregivers] = useState<any[]>([]);

  const handleCaretakerChange = (selectedCaretaker: any) => {
    if (selectedCaretaker) {
      setValue("caretakerName", selectedCaretaker.label); 
      setValue("caretakerID", selectedCaretaker.value.id);
      setValue("caretaker", selectedCaretaker.value); 
    }
  }

  const fetchCaregivers = async () => {
    try {
        const fetchedData = await getCaregivers();
        setCaregivers(fetchedData.map((caregiver) => (
          { label: caregiver.name, value: caregiver }
        )));
    } catch (error) {
        console.error('Error fetching records.');
    }
};

  const defaultCaretaker = values?.caretakerID
  ? caregivers.find(c => c.value.id === values.caretakerID) 
  : null;

  useEffect(() => {
    fetchCaregivers();
  }, [])

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font-bold">{header}</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setModal(false)}
              >
                <FaTimes onClick={() => setModal(false)} />
              </button>
            </div>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div className="block p-6 rounded-lg shadow-lg  max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group mr-3 mb-3">
                    <p>First Name</p>
                    <input
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      defaultValue={values?.firstName}
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <p>Last Name</p>
                    <input
                      type="text"
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      defaultValue={values?.lastName}
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-3 mr-5">
                    <p>Date of Birth</p>
                    <input
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      placeholder="MM/DD/YY"
                      defaultValue={values?.birthday}
                      {...register("dob", { required: false })}
                    />
                    {/* {errors.dob && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )} */}
                  </div>
                  <div className="form-group mb-3">
                    <p>Sex</p>
                    <select
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      defaultValue={values?.sex || "select"}
                      {...register("sex", { required: true })}
                    >
                      <option value="select">Select</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div className="form-group mb-3 w-full col-span-2 ">
                    <SearchableDropdown options={caregivers}
                    label="Caregiver" placeholder={defaultCaretaker?.label ?? "Select"} onChange={handleCaretakerChange}/>
                  </div>
                  <div className="form-group mb-3 w-full col-span-2">
                    <p>Mother Name</p>
                    <input
                      type={"text"}
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      placeholder="First Last"
                      defaultValue={values?.motherName}
                      {...register("motherName", { required: true })}
                    />
                    {errors.motherName && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-3 w-full col-span-2">
                    <p>Hospital of Birth</p>
                    <input
                      type={"text"}
                      className="w-full bg-[#FAFBFC] border-[#D9D9D9] border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      defaultValue={values?.hospitalName}
                      {...register("hospitalName", { required: false })}
                    />
                  </div>
                  <div className="form-group flex justify-end w-full col-span-2 mt-5">
                    <button
                      className="px-4 py-2 rounded-md text-md text-[#B14378] font-semibold"
                      onClick={() => setModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`"bg-transparent hover:bg-[#B14378] text-[#B14378] font-semibold hover:text-white py-2 px-4 border border-[#B14378] hover:border-transparent rounded" ${
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {buttonText}
                    </button>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChildModal;
