import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { auth } from "db/firebase";
import { updateCaregiver } from "db/actions/shared/Caregiver";
import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { Caregiver } from "@lib/types/users";

import TextInput from "@components/atoms/TextInput";
import SignOutButton from "@components/SignOutButton";
import TitleTopBar from "@components/logos/TitleTopBar";

const Settings = ({ caregiver }: { caregiver: Caregiver }) => {
  const [editingSection, setEditingSection] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [caregiverData, setCaregiverData] = useState(caregiver);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: caregiverData,
  });

  const handleChangePassword = () => {
    setEditingSection("password");
    reset();
  };

  const onSubmit = async (data: any) => {
    let updateData: any; // Declare updateData once

    if (editingSection === "password") {
      updateData = getValues(["newPassword"]); // Pass the required fields as an array
    } else if (editingSection === "account") {
      updateData = getValues(["firstName", "lastName", "email", "phoneNumber"]);
    } else if (editingSection === "address") {
      updateData = getValues([
        "streetAddress",
        "apartment",
        "city",
        "state",
        "zipCode",
      ]);
    }

    setEditingSection("");
    if (!auth.currentUser) return;
    setSubmitting(true);
    try {
      await updateCaregiver(auth.currentUser?.uid, updateData);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    // Navigate to the appropriate screen when back button is clicked
    if (editingSection === "password") {
      setEditingSection("account"); // Go back to account editing
      reset(caregiverData);
    } else {
      setShowModal(true);
      // setEditingSection(""); // Go back to the main settings view
    }
  };

  return (
    <div className="w-full h-full">
      <TitleTopBar title="Settings" />
      <div className="p-4 sm:p-16 w-full sm:max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center sm:items-center items-end z-50">
            <div className="bg-white rounded-t-lg sm:rounded-lg p-6 w-full sm:w-11/12 sm:max-w-md shadow-lg">
              <h2 className="text-black text-lg font-bold mb-2">
                Your changes won’t be saved.
              </h2>
              <p className="text-black text-base font-normal">
                If you return to the previous screen, your changes will not be
                saved.
              </p>
              <div className="flex justify-end space-x-4 pt-[20.80px]">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingSection("");
                  }}
                  className="text-mbb-pink bg-white rounded border border-mbb-pink px-4 pt-2 pb-[9px] text-base font-semibold w-1/2"
                >
                  Don’t save
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="text-mbb-pink bg-white rounded border border-white px-4 pt-2 pb-[9px] text-base font-semibold w-1/2"
                >
                  Keep editing
                </button>
              </div>
            </div>
          </div>
        )}
        {editingSection === "" ? (
          <div className="w-[230px] h-[496px] flex-col justify-start items-start gap-9 inline-flex">
            <div className="self-stretch h-[315px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <div className="text-black text-lg font-bold">
                  Account Information
                </div>
                <button
                  className="text-mbb-pink text-base font-semibold"
                  onClick={() => setEditingSection("account")}
                >
                  Edit
                </button>
              </div>
              <div className="h-[46px] flex-col justify-start items-start gap-[3px] flex">
                <div className="self-stretch text-dark-gray text-sm font-semibold">
                  First Name
                </div>
                <div className="self-stretch text-black text-base font-normal leading-normal">
                  {caregiverData.firstName}
                </div>
              </div>
              <div className="h-[46px] flex-col justify-start items-start gap-[3px] flex">
                <div className="self-stretch text-dark-gray text-sm font-semibold">
                  Last Name
                </div>
                <div className="self-stretch text-black text-base font-normal leading-normal">
                  {caregiverData.lastName}
                </div>
              </div>
              <div className="h-[46px] flex-col justify-start items-start gap-[3px] flex">
                <div className="self-stretch text-dark-gray text-sm font-semibold">
                  Email
                </div>
                <div className="self-stretch text-black text-base font-normal leading-normal">
                  {caregiverData.email}
                </div>
              </div>
              <div className="h-[46px] flex-col justify-start items-start gap-[3px] flex">
                <div className="self-stretch text-dark-gray text-sm font-semibold">
                  Phone Number
                </div>
                <div className="self-stretch text-black text-base font-normal leading-normal">
                  {caregiverData.phoneNumber}
                </div>
              </div>
              <div className="h-[46px] flex-col justify-start items-start gap-[3px] flex">
                <div className="self-stretch text-dark-gray text-sm font-semibold">
                  Password
                </div>
                <div className="self-stretch text-black text-base font-normal leading-normal">
                  {"•".repeat(12)}
                </div>
              </div>
            </div>
            <div className="h-[87px] flex-col justify-start items-start gap-[18px] flex">
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="w-[72px] text-black text-lg font-bold">
                  Address
                </div>
                <button
                  className="text-mbb-pink text-base font-semibold"
                  onClick={() => setEditingSection("address")}
                >
                  Edit
                </button>
              </div>
              <div className="self-stretch text-black text-base font-normal">
                {caregiverData.address}, {caregiverData.apartment}
                <br />
                {caregiverData.city}, {caregiverData.state}{" "}
                {caregiverData.zipCode}
              </div>
            </div>
            <div className="self-start">
              <SignOutButton />
            </div>
          </div>
        ) : editingSection === "account" ? (
          <div className="flex-col justify-start items-start gap-3 inline-flex w-full sm:max-w-md">
            <button
              className="text-black mb-4 font-semibold flex items-center"
              onClick={goBack}
            >
              {/* <img src={back_button} /> */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 19.5L9.75 13L16.25 6.5"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-black text-xl font-normal">Back</div>
            </button>
            <div className="text-black text-lg font-bold">
              Edit Account Information
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex-col w-full sm:max-w-md"
            >
              <>
                <TextInput
                  label="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="First Name"
                  currentValue={caregiverData.firstName}
                  error={errors.firstName?.message as string}
                  onChange={(value) => setValue("firstName", value)}
                />
                <TextInput
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Last Name"
                  currentValue={caregiverData.lastName}
                  error={errors.lastName?.message as string}
                  onChange={(value) => setValue("lastName", value)}
                />
                <div className="self-stretch h-[51px] flex-col justify-start items-start gap-[3px] flex">
                  <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
                    <div className="w-[41px] h-6 justify-center items-center inline-flex">
                      <div className="text-black text-base font-normal font-['Open Sans'] leading-normal">
                        Email
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch text-black text-base font-normal font-['Open Sans'] leading-normal">
                    {caregiverData.email}
                  </div>
                </div>
                <TextInput
                  label="Phone Number"
                  {...register("phoneNumber")}
                  currentValue={caregiverData.phoneNumber}
                  onChange={(value) => setValue("phoneNumber", value)}
                />
              </>
              <div className="mt-4">
                <button
                  className="self-stretch text-mbb-pink text-base font-semibold"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="text-mbb-pink text-base font-semibold leading-[25px] pt-2 px-4 pb-[9px] self-stretch bg-white rounded border border-mbb-pink gap-2 inline-flex w-full sm:max-w-md flex justify-center items-center text-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
            {/* <div class="self-stretch h-[45px] px-4 pt-2 pb-[9px] bg-white rounded border border-[#b14378] justify-center items-center gap-2 inline-flex">
        <div class="text-[#b14378] text-base font-semibold font-['Open Sans'] leading-[25px]">Save changes</div>
    </div> */}
          </div>
        ) : editingSection === "password" ? (
          <div className="flex-col justify-start items-start gap-3 inline-flex w-full sm:max-w-md">
            <button
              className="text-pink-500 mb-4 font-semibold flex items-center"
              onClick={goBack}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 19.5L9.75 13L16.25 6.5"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-black text-xl font-normal">Back</div>
            </button>
            <div className="text-black text-lg font-bold">Edit Password</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full sm:max-w-md"
            >
              {/* paragraph to prevent prefilling account values to password form */}
              <p> </p>
              <>
                <TextInput
                  label="Old Password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  error={errors.oldPassword?.message as string}
                  inputType="password"
                  placeholder="Old Password"
                  onChange={(value) => setValue("oldPassword", value)}
                />
                <TextInput
                  label="New Password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  error={errors.newPassword?.message as string}
                  inputType="password"
                  placeholder="Password"
                  onChange={(value) => setValue("newPassword", value)}
                />
                <TextInput
                  label="Confirm New Password"
                  inputType="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      return (
                        value === watch("newPassword") ||
                        "Passwords do not match"
                      );
                    },
                  })}
                  error={errors.confirmPassword?.message as string}
                  onChange={(value) => setValue("confirmPassword", value)}
                />
              </>
              <button
                type="submit"
                className="text-mbb-pink text-base font-semibold leading-[25px] pt-2 px-4 pb-[9px] self-stretch bg-white rounded border border-mbb-pink gap-2 inline-flex w-full sm:max-w-md flex justify-center items-center text-center"
              >
                Change Password
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-col justify-start items-start gap-3 inline-flex w-full sm:max-w-md">
            <button
              className="text-pink-500 mb-4 font-semibold flex items-center"
              onClick={goBack}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 19.5L9.75 13L16.25 6.5"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-black text-xl font-normal">Back</div>
            </button>
            <div className="text-black text-lg font-bold">Edit Address</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full sm:max-w-md"
            >
              <TextInput
                label="Street Address"
                currentValue={caregiverData.address}
                {...register("address", {
                  required: "Street address is required",
                })}
                error={errors.address?.message as string}
                onChange={(value) => setValue("address", value)}
              />
              <TextInput
                label="Apartment"
                currentValue={caregiverData.apartment}
                {...register("apartment")}
                error={errors.apartment?.message as string}
                onChange={(value) => setValue("apartment", value)}
              />
              <TextInput
                label="City"
                currentValue={caregiverData.city}
                {...register("city", { required: "City is required" })}
                error={errors.city?.message as string}
                onChange={(value) => setValue("city", value)}
              />
              {/* TODO change to Dropdown with states like in Onboarding */}
              <TextInput
                label="State"
                currentValue={caregiverData.state}
                {...register("state", { required: "State is required" })}
                error={errors.state?.message as string}
                onChange={(value) => setValue("state", value)}
              />
              <TextInput
                label="Zip Code"
                currentValue={caregiverData.zipCode}
                {...register("zipCode", { required: "Zip code is required" })}
                error={errors.zipCode?.message as string}
                onChange={(value) => setValue("zipCode", value)}
              />
              <button
                type="submit"
                className="text-mbb-pink text-base font-semibold leading-[25px] pt-2 px-4 pb-[9px] self-stretch bg-white rounded border border-mbb-pink gap-2 inline-flex w-full sm:max-w-md flex justify-center items-center text-center"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const caregiver = (await getCurrentCaregiver(context)) as Caregiver;

  if (caregiver) {
    caregiver.babies = [];
    if (caregiver.itemsRequested) {
      caregiver.itemsRequested.created = null;
      caregiver.itemsRequested.updated = null;
    }
  }

  return { props: { caregiver: caregiver } };
};
