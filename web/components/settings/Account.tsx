import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";

type AccountEntry = {
  confirmNewPassword: string;
  currentPassword: string;
  newPassword: string;
  phoneNumber: string;
};
export default function Account(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [accounts, setAccounts] = useState<AccountEntry[]>([]);
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState<any>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
  const [userChanges, setUserChanges] = useState<AccountEntry[]>([]);
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "app", "settings"), (doc) => {
      setPhoneNum(doc.data()?.contact.phone);
      setContact(doc.data()?.contact)
    });

    return unsub;
  }, []);

  useEffect(() => {
    // props.setChangesMade(JSON.stringify(userChanges) !== JSON.stringify(accounts));

    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!props.getChangesMade()) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      //   if (!props.getChangesMade) return;
      if (window.confirm(warningText)) return;
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [userChanges]);

  const hidePasswordButton = () => {
    setShowPasswordForm(true);
  };

  const hidePhoneNumberButton = () => {
    setShowPhoneNumberForm(true);
  };

  return (
    //   accounts?.map((account, index) => {
    <div>
      <h1 className="text-xl font-bold w-full" style={{ marginTop: "50px" }}>
        Account Information
      </h1>
      <div style={{ marginTop: "20px" }}>
        <form>
          <label>Phone Number:</label>
          {!showPhoneNumberForm ? (
            <>
              <input
                type="text"
                value={contact.phone}
                style={{ marginLeft: "15px", width: "115px" }}
              />
              <button
                type="button"
                style={{ color: "#304CD1", marginLeft: "10px" }}
                onClick={() => {
                  hidePhoneNumberButton();
                }}
              >
                Edit
              </button>
            </>
          ) : null}
          {showPhoneNumberForm ? (
            <>
              <input
                className="w-1/5 ml-3.5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                onChange={(e) => {
                  setPhoneNum(e.target.value)
                }}
                value={phoneNum}
              ></input>

              <button
                className="ml-3.5 flex-shrink-0 bg-white-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const temp = contact;
                  temp.phone = phoneNum;
                  updateDoc(doc(db, 'app', 'settings'), {contact : temp})
                  alert("Succesfully updated phone number!")
                  setShowPhoneNumberForm(false);
                }}
              >
                Save
              </button>
              <button
                className="flex-shrink-0 bg-white-500 hover:bg-blue-700 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
                type="submit"
                onClick={() => {
                  setShowPhoneNumberForm(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : null}
        </form>
      </div>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <form>
          {!showPasswordForm ? (
            <>
              <label>
                Password:
                <input
                  type="text"
                  value={".........."}
                  style={{ marginLeft: "15px", width: "50px" }}
                />
              </label>
              <button
                type="button"
                style={{ color: "#304CD1", marginLeft: "8px" }}
                onClick={() => {
                  hidePasswordButton();
                }}
              >
                Edit
              </button>
            </>
          ) : null}
          {showPasswordForm ? (
            <div style={{ display: "flex" }}>
              <>
                <div style={{ marginRight: "15px" }}>
                  <p>New Password</p>
                  <input
                    className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                    style={{ width: "218px" }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>

                <div style={{ marginRight: "15px" }}>
                  <p>Confirm New Password</p>
                  <input
                    className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                    style={{ width: "218px" }}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="flex items-end">
                  <button
                    className="flex-shrink-0 bg-white-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!user) {
                        return;
                      }
                      updatePassword(user, password)
                        .then(() => {
                          // Update successful.
                          alert("password successfully updated");
                          setShowPasswordForm(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          alert(error.message);
                          // An error ocurred
                          // ...
                        });
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="flex-shrink-0 bg-white-500 hover:bg-blue-700 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPasswordForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            </div>
          ) : null}
        </form>
      </div>
      <div className="fixed bottom-0 right-0 left-[318px] bg-white border-t-[1px] px-10 py-4">
        <div className="flex items-right justify-between">
          <div className="text-[#304CD1] font-semibold hover:cursor-pointer" />
          <div
            //   style = {{"py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"}}
            className={
              "flex-shrink-0 bg-white-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
            }

            //   className={`py-2 px-3 rounded font-semibold hover:cursor-pointer border-[1px]`}
            // ${
            //   props.getChangesMade()
            //     ? "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"
            //     : "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer"
            // }`}
            //    onClick={saveChanges}
          >
            <div style={{ marginTop: "3px" }}>Save changes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
