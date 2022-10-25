// import ButtonWithIcon from "@components/ButtonWithIcon";
// import { db } from "@lib/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { GetServerSideProps } from "next";
// import Link from "next/link";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { BsFillPencilFill } from "react-icons/bs";
import Account from "@components/settings/Account";
import LiabilityWaver from "@components/settings/LiabilityWaver";

// type SettingsPhone = {
//   phoneNumber: string;
// };

function genSettingsTab() {
  //{ phoneNumber }: SettingsPhone) {
  //const [phNumber, setPhNumberState] = useState(phoneNumber);
  //const [settingsPage, setSettingsPage] = use
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm<SettingsPhone>();

  // const onSubmit = handleSubmit(async (data) => {
  //   const newNumber = data.phoneNumber;

  //   const settingsRef = doc(db, "app", "settings");

  //   await updateDoc(settingsRef, {
  //     contact: {
  //       phone: newNumber,
  //     },
  //   });

  //   alert("Phone number updated");
  //   setPhNumberState(newNumber);
  //   setValue("phoneNumber", "");
  // })

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const sections = [
    {
      title: "Account",
      component: <Account />,
    },
    {
      title: "Liability Waver",
      component: <LiabilityWaver />,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-row items-center py-6 border-b w-full px-10">
        <h1 className="text-2xl font-bold w-full">Settings</h1>
        {/* <h2 className="text-md mt-5 mb-5 font-bold">
          Current Phone Number: {phNumber}
        </h2> */}
      </div>
      <section className="px-10">
        <div className="border-b flex gap-x-1 mt-8 w-full">
          {sections.map((section, i) => (
            <button
              className={`py-4 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
                selectedSectionIndex === i
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => setSelectedSectionIndex(i)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <>{sections[selectedSectionIndex].component}</>
      </section>
      {/* <h2 className="text-md mb-5 font-bold">Update Phone Number</h2>
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
        </div> */}
    </div>
  );
}

export default genSettingsTab;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const settingsRef = doc(db, "app", "settings");
//   const settings = (await getDoc(settingsRef))?.data();

//   return {
//     props: {
//       phoneNumber: settings?.contact.phone,
//     },
//   };
// };
