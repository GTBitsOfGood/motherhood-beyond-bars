import ButtonWithIcon from "@components/buttonWithIcon";
import { db } from "@lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPencilFill } from "react-icons/bs";

const isValidPhoneNumber = (phone: string) =>
  /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);

type SettingsPhone = {
  phoneNumber: string;
};

function genSettingsTab({ phoneNumber }: SettingsPhone) {
  const [phNumber, setPhNumberState] = useState(phoneNumber);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsPhone>();

  const onSubmit = handleSubmit(async (data) => {
    const newNumber = data.phoneNumber;
    console.log("test")
    if (!isValidPhoneNumber(newNumber)) {
      alert("Invalid phone number");
      return;
    }

    const settingsRef = doc(db, "app", "settings");

    await updateDoc(settingsRef, {
      contact: {
        phone: newNumber,
      },
    });

    alert("Phone number updated");
    setPhNumberState(newNumber);
    setValue("phoneNumber", "");
  });

  return (
    <div>
      <div className="absolute mt-20 border-t w-full" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <h1 className="text-2xl mb-5 font-bold">Settings</h1>
        <h2 className="text-md mt-5 mb-5 font-bold">
          Current Phone Number: {phNumber}
        </h2>
        <h2 className="text-md mb-5 font-bold">Update Phone Number</h2>
        <form className="w-full max-w-sm" onSubmit={onSubmit}>
          <div className="flex items-center border-b py-2">
            <input
              id="phoneInput"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Enter Phone Number"
              aria-label="Phone number"
              {...register("phoneNumber", {
                pattern:
                  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                required: true,
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs italic">
                {" "}
                {errors.phoneNumber.message}
              </p>
            )}
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="my-10">
          <Link href="/waivers">
            <ButtonWithIcon text="Waivers" icon={<BsFillPencilFill />} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default genSettingsTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const settingsRef = doc(db, "app", "settings");
  const settings = (await getDoc(settingsRef))?.data();

  return {
    props: {
      phoneNumber: settings?.contact.phone,
    },
  };
};
