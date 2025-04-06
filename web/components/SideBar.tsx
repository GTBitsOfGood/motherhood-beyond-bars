import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { collection, query, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "db/firebase";

import { Caregiver } from "@lib/types/users";
import NavBarLogo from "./logos/NavBarLogo";
import { onAuthStateChanged } from "firebase/auth";

function SideBar(props: any) {
  const [pendingCount, setPendingCount] = useState();
  const [route, setRoute] = useState("");
  const router = useRouter();
  const [caregiver, setCaregiver] = useState<any>(null);

  useEffect(() => {
    setRoute(window.location.pathname);
  });

  useEffect(() => {
    const q = query(collection(db, "caregivers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempData: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempData.push(data);
      });
      tempData = tempData.filter(
        (x: Caregiver) => x.itemsRequested && x.itemsRequested.items
      );

      tempData = tempData.filter(
        (x: Caregiver) => x.itemsRequested.status == "Pending"
      );
      setPendingCount(tempData.length);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        const caregiverRef = doc(db, "caregivers", user.uid);
        const unsubscribeCaregiver = onSnapshot(caregiverRef, (snapshot) => {
          if (snapshot.exists()) {
            setCaregiver(snapshot.data());
          }
        });
        return () => unsubscribeCaregiver();
      } else {
        setCaregiver(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    // TODO fix current tab highlight
    <div className="fixed top-0 sm:top-auto sm:static h-full w-2/3 sm:w-[18%] bg-black text-white z-50 sm:z-0">
      <div className="w-full flex-col justify-start z-50 sm:z-0">
        {/* TODO populate name */}
        <NavBarLogo isAdmin={props.isAdmin} caregiverName={
          caregiver
          ? caregiver.firstName + " " + caregiver.lastName
          : "Jane Care"
        } />
        <div className="pt-4">
          {(props.isAdmin
            ? props.items.AdminSideBarItems
            : props.items.CaregiverSideBarItems
          ).map((item: any, idx: number) => (
            <ul
              key={idx}
              className={`px-8 py-2 flex-col justify-center items-center  
                ${item.route === route ? "bg-gray-600 text-white" : "text-navbar-gray-text hover:text-white"}
                ${item.name === "Item Requests" && router.asPath.includes("/item-management") ? "bg-gray-600" : ""}
              `}
            >
              <div className="my-auto" key={idx}>
                <Link href={item.route} key={idx}>
                  <li
                    className="flex h-full w-full justify-between cursor-pointer items-center py-3"
                    onClick={(e) => {
                      // If click the current page, do not refresh, otherwise there's error "attempted to hard navigate to same URL"
                      if (window.location.pathname === item.route) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div
                      className={`${item.name === "Item Requests" ? "" : "flex-col"}`}
                    >
                      <div className="flex items-center">
                        <Image src={item.icon} alt={item.name} />
                        <span className={`text-base font-semibold ml-4`}>
                          {item.name}
                        </span>
                      </div>
                      {item.name === "Item Requests" &&
                        router.asPath.includes("/item") && (
                          <button
                            className={`ml-9 mt-1 focus:outline-none focus:border-none focus:ring-0 hover:text-white hover:font-semibold
                              ${router.asPath.includes("/item-management") ? "text-white font-semibold" : "text-navbar-gray-text"}`}
                            onClick={() =>
                              router.push("/admin/item-management")
                            }
                          >
                            Item Managment
                          </button>
                        )}
                    </div>
                  </li>
                </Link>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;

