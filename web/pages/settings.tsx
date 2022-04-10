import { db } from "@lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type SettingsPhone = {
  phoneNumber: string;
};

function genSettingsTab({ phoneNumber }: SettingsPhone) {
  const [phNumber, setPhNumberState] = useState(phoneNumber);
  const [editPhone, setEditPhone] = useState(false);
  const [password, setPassword] = useState("passwordpasswordpasswordpasswordpasswordpassword");
  const [editPassword, setEditPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsPhone>();

  const onPhoneNumberSubmit = handleSubmit(async (data) => {
    const newNumber = data.phoneNumber;
    if (newNumber != phNumber) {
      const settingsRef = doc(db, "app", "settings");
      await updateDoc(settingsRef, {
        contact: {
          phone: newNumber,
        },
      });
      alert("Phone number updated");
      setPhNumberState(newNumber);
      setEditPhone(false);
    }
  });

  const onPasswordSubmit = handleSubmit(async (data) => {

  })

  return (
    <div>
      <div className="absolute mt-20 border-t w-[1122px]" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <h1 className="text-2xl mb-5 font-bold">Settings</h1>
        <label className="font-bold text-lg pt-6">Account Information</label>
        <form onSubmit={onPhoneNumberSubmit}>
          <div className="flex items-center pt-3">
            <label>
            Phone Number:
            </label>
            {editPhone ? (
              <div className="flex items-center">
                <input
              id="phoneInput"
              className="h-10 appearance-none block ml-4 bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              defaultValue={phNumber}
              aria-label="Phone number"
              {...register("phoneNumber", {
                pattern:
                  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                required: true,
              })}
            />
            <button
              className="h-10 w-[68px] flex-shrink-0 hover:bg-blue-100 border-blue-700 text-base border text-blue-700 ml-4 rounded"
              type="submit"
            >
              Save
            </button>
            <button
              className="h-10 w-20 flex-shrink-0 hover:text-blue-900 text-base text-blue-700"
              onClick={()=>setEditPhone(false)}
            >
              Cancel
            </button>
              </div>
            ) : (
              <div className="flex items-center">
                <p className="ml-4">{phNumber}</p>
                <button
                className="h-10 w-20 flex-shrink-0 hover:text-blue-900 text-base text-blue-700"
                onClick={()=>setEditPhone(true)}
              >
                Edit
              </button>
              </div>
            )}
          </div>
        </form>
        <form onSubmit={onPasswordSubmit}>
          <div>
            {editPassword ?
              (
                <div className="pt-4">
                  <div className="flex items-center">
                    <label className="pr-[35px]">
                    Password:
                    </label>
                      <label className="pr-[76px]">
                      Current password
                      </label>
                      <label className="pr-[95px]">
                      New password
                      </label>
                      <label>
                      Confirm new password
                      </label>
                  </div>
                  <div className="flex items-center pt-1">   
                    <input
                      className="h-10 ml-[107px] mr-3 appearance-none block bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                      type="password"
                      aria-label="Current password"
                    />
                    <input
                      className="h-10 mr-3 appearance-none block bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                      type="password"
                      aria-label="New password"
                    />
                    <input
                      className="h-10 appearance-none block bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                      type="password"
                      aria-label="Confirm new password"
                    />
                    <button
                      className="h-10 w-[68px] flex-shrink-0 hover:bg-blue-100 border-blue-700 text-base border text-blue-700 ml-4 rounded"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="h-10 w-20 flex-shrink-0 hover:text-blue-900 text-base text-blue-700"
                      onClick={()=>setEditPassword(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center pt-2">
                  <label className="pr-[54px]">
                  Password:
                  </label>
                  <div className="flex items-center">
                      <input
                        className="bg-white w-[116px] mr-5"
                        type="password"
                        value={password}
                        disabled
                        aria-label="password"
                      />
                      <button
                      className="h-10 flex-shrink-0 hover:text-blue-900 text-base text-blue-700"
                      onClick={()=>setEditPassword(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </form>
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
