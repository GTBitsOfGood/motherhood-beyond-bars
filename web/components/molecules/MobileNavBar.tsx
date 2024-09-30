import React, { useState, useEffect } from "react";
import Image from "next/image";
import admin_portal_gradient from "../public/admin_portal_gradient.png";
import left_heart from "../public/left_heart.png";
import right_heart from "../public/right_heart.png";
import SignOutButton from "../SignOutButton";
import Link from "next/link";
import { useRouter } from "next/router";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "db/firebase";

import { Caregiver } from "pages/admin/item-requests";
import NavBarLogo from "../logos/NavBarLogo";
import TopBar from "@components/logos/TopBar";

function MobileNavBar(props: any) {
  console.log(props.items);
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState();

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div>
        <TopBar 
            onNavToggle={() => {
                setIsOpen(true);
            }}
            title={
                // Use window.location.pathname instead of router.pathname because these pages not exist yet (router.pathname = "_ERROR" for now), 
                // but could be changed back to router.pathname in the future for consistency

                // Get the last word from the address, and use it as title
                // router.pathname
                window.location.pathname
                .split('/')
                .slice(-1)[0]
                .toUpperCase()}
        />

        {isOpen && 
            <>
                {/* Dark the original screen */}
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsOpen(false)} 
                />

                {/* Nav Bar - referenced from the SideBar */}
                <div className="fixed top-0 left-0 h-full w-[318px] bg-black text-white z-50">
                    <div className="w-[318px] flex-col justify-start z-50">
                        <NavBarLogo isAdmin={props.isAdmin} caregiverName="ABC D"/>
                        <div className="pt-4">
                        {(props.isAdmin? props.items.AdminSideBarItems : props.items.CaregiverSideBarItems).map((item: any, idx: number) => (
                            <ul
                            key={idx}
                            className={`px-8 py-2 flex-col justify-center items-center ${
                                item.route == router.pathname ? "bg-gray-500" : ""
                            }`}
                            >
                            <div className="my-auto" key={idx}>
                                <Link key={idx} href={item.route}>
                                <li className="flex h-full w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center py-3">
                                    <div className="flex items-center">
                                    <Image src={item.icon} />
                                    <span className="text-base font-semibold text-white hover:text-slate-400 ml-4">
                                        {item.name}
                                    </span>
                                    {item.name == "Item Requests" ? (
                                        <span className="px-2 bg-[#FF7171] text-white ml-2 rounded">
                                        {pendingCount} pending
                                        </span>
                                    ) : null}
                                    </div>
                                </li>
                                </Link>
                            </div>
                            </ul>
                        ))}
                        </div>
                    </div>
                    <div className="text-white">
                        <SignOutButton />
                    </div>
                </div>
            </>
        }
    </div>
  );
}

export default MobileNavBar;
