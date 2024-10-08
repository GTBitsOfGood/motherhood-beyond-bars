import React, { useState, useEffect } from "react";
import Image from "next/image";
import admin_portal_gradient from "../public/admin_portal_gradient.png";
import left_heart from "../public/left_heart.png";
import right_heart from "../public/right_heart.png";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { useRouter } from "next/router";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "db/firebase";

import { Caregiver } from "pages/admin/item-requests";

function SideBar(props: any) {
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState();

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
    <div className="flex flex-col justify-between sm:relative bg-black shadow md:h-full hidden sm:flex">
      <div className="w-[318px] flex-col justify-start ">
        <span className="left-0 right-0 w-[318px] h-[81px]">
          <Image className="relative" src={admin_portal_gradient} />
        </span>
        <span className="absolute top-[26px] left-[33px]">
          <Image className="static px-10" src={left_heart} />
        </span>
        <span className="absolute top-[26px] left-[49px]">
          <Image className="static px-10" src={right_heart} />
        </span>
        <span className="absolute top-[29px] left-[82px]">
          <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
            Admin Portal
          </h1>
        </span>
        <div className="pt-4">
          {props.items.map((item: any, idx: number) => (
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
  );
}

export default SideBar;
