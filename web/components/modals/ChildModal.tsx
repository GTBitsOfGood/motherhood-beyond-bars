import DatePicker from "@components/atoms/DatePicker";
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
  const [selectedDate, setSelectedDate] = useState(
    values?.birthday ? new Date(values.birthday) : undefined
  );

  useEffect(() => {
    // Initialize the date from values if it exists
    if (values?.birthday) {
      setSelectedDate(new Date(values.birthday));
      setValue("dob", values.birthday);
    }
  }, [values?.birthday, setValue]);

  const handleCaretakerChange = (selectedCaretaker: any) => {
    if (selectedCaretaker) {
      setValue("caretakerName", selectedCaretaker.label);
      setValue("caretakerID", selectedCaretaker.value.id);
      setValue("caretaker", selectedCaretaker.value);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const fetchedData = await getCaregivers();
      setCaregivers(
        fetchedData.map((caregiver) => ({
          label: caregiver.name,
          value: caregiver,
        }))
      );
    } catch (error) {
      console.error("Error fetching records.\n", error);
    }
  };

  const closeModal = () => setModal(false);

  const defaultCaretaker = values?.caretakerID
    ? caregivers.find((c) => c.value.id === values.caretakerID)
    : null;

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setValue("dob", date); // Update form state
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-60"
        onClick={closeModal}
      >
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div
              className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-5 border-b border-solid border-light-gray rounded-t ">
                <h3 className="text-2xl font-bold">{header}</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={closeModal}
                >
                  <FaTimes onClick={closeModal} />
                </button>
              </div>
              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="block p-6 rounded-lg shadow-lg  max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mr-3 mb-3">
                      <p>
                        First Name
                        <span className="text-asterisks-red text-sm">*</span>
                      </p>
                      <input
                        className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        defaultValue={values?.firstName}
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <span className="text-error-red">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <p>
                        Last Name
                        <span className="text-asterisks-red text-sm">*</span>
                      </p>
                      <input
                        type="text"
                        className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        defaultValue={values?.lastName}
                        {...register("lastName", { required: true })}
                      />
                      {errors.lastName && (
                        <span className="text-error-red">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-group mr-5">
                      <DatePicker
                        label="Date of Birth"
                        value={selectedDate}
                        onChange={handleDateChange}
                        error={
                          errors.dob ? "This field is required" : undefined
                        }
                        required={true}
                      />
                    </div>
                    <div className="form-group">
                      <p>
                        Sex
                        <span className="text-asterisks-red text-sm">*</span>
                      </p>
                      <select
                        className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        defaultValue={values?.sex || "select"}
                        {...register("sex", { required: true })}
                      >
                        <option value="select">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                    <div className="form-group mb-3 w-full col-span-2 ">
                      <SearchableDropdown
                        options={caregivers}
                        label="Caregiver"
                        defaultPlaceholder="Search for Caregiver"
                        placeholder={defaultCaretaker?.label}
                        onChange={handleCaretakerChange}
                      />
                    </div>
                    <div className="form-group mb-3 w-full col-span-2">
                      <p>
                        Mother Name
                        <span className="text-asterisks-red text-sm">*</span>
                      </p>
                      <input
                        type={"text"}
                        className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        placeholder="First Last"
                        defaultValue={values?.motherName}
                        {...register("motherName", { required: true })}
                      />
                      {errors.motherName && (
                        <span className="text-error-red">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-group mb-3 w-full col-span-2">
                      <p>Hospital of Birth</p>
                      <input
                        type={"text"}
                        className="w-full bg-secondary-background border-light-gray border-2 rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        defaultValue={values?.hospitalName}
                        {...register("hospitalName", { required: false })}
                      />
                    </div>
                    <div className="form-group flex justify-end w-full col-span-2 mt-5">
                      <button
                        className="px-4 py-2 rounded-md text-md text-mbb-pink font-semibold"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`"bg-transparent hover:bg-mbb-pink text-mbb-pink font-semibold hover:text-white py-2 px-4 border border-mbb-pink hover:border-transparent rounded" ${
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
      </div>
    </>
  );
}

export default ChildModal;
