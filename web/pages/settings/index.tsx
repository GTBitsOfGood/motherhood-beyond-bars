import { db } from "@lib/firebase";
import { doc, getDoc, updateDoc, query, collection, getDocs, orderBy } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import Waivers from "./waivers/index";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";

type PhoneSettings = {
  phoneNumber: string;
};

interface Props {
  waivers: Waiver[];
}

const AccountTab = ({ phoneNumber }: PhoneSettings) => {
  const [phNumber, setPhNumberState] = useState(phoneNumber);
  const [editPhone, setEditPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneSettings>();

  const auth = getAuth();
  const user = auth.currentUser;

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

  const validateOldPassword = (oldPassword: string) => {
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      return reauthenticateWithCredential(user, credential).then(()=>false).catch(()=>true);
    }
    return false;
  }
  
  const onPasswordSubmit = handleSubmit(async () => {
    if (user) {
      updatePassword(user, password).then(() => {
        alert("Password updated");
      })
    }
  })
  
  return (
    <div>
        <form onSubmit={onPhoneNumberSubmit}>
          <div className="flex items-center">
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
                      {...register("oldPassword", {
                        validate: value => validateOldPassword(value) || 'Current password is invalid',
                        required: true || 'Current password field is required',
                      })}
                    />
                    <input
                      className="h-10 mr-3 appearance-none block bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                      type="password"
                      aria-label="New password"
                      {...register("newPassword", {
                        minLength: 6 || 'Password must be at least 6 characters',
                        onChange: e => setPassword(e.target.value),
                        required: true || 'New password field is required'
                      })}
                    />
                    <input
                      className="h-10 appearance-none block bg-gray-100 text-gray-700 border rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                      type="password"
                      aria-label="Confirm new password"
                      {...register("password", {
                        validate: value => value === password || 'Passwords do not match',
                        required: true || 'Confirm new password field is required'
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
  );
}

const Tabs = ({ phoneNumber, waivers }: PhoneSettings & Props) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li>
              <a
                className={"px-4 text-base font-semibold w-[99px] h-[42px] border mr-1 flex items-center rounded-t"
                + (openTab === 1 ? " bg-[#304cd1] text-white" : " bg-[#f2f2f2] text-[#666666]")}
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Account
              </a>
            </li>
            <li>
              <a
                className={"px-5 text-base font-semibold w-[155px] h-[42px] border mr-5 flex items-center rounded-t"
                + (openTab === 2 ? " bg-[#304cd1] text-white" : " bg-[#f2f2f2] text-[#666666]")}
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Liability Waiver
              </a>
            </li>
            <div className="absolute mt-[41px] border-t w-[70%]" />
          </ul>
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <AccountTab phoneNumber={phoneNumber}/>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <Waivers waivers={waivers}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Settings({ phoneNumber, waivers }: PhoneSettings & Props) {
  return (
    <div>
      <div className="absolute mt-20 border-t w-[1122px]" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <h1 className="text-2xl mb-10 font-bold">Settings</h1>
        <Tabs phoneNumber={phoneNumber} waivers={waivers}/>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const settingsRef = doc(db, "app", "settings");
  const settings = (await getDoc(settingsRef))?.data();
  
  const queryRef = query(collection(db, "waivers"), orderBy("order", "asc"));
  const allWaivers = (await getDocs(queryRef)).docs.map(formatDoc) as Waiver[];

  return {
    props: {
      phoneNumber: settings?.contact.phone,
      waivers: allWaivers,
    },
  };
};
