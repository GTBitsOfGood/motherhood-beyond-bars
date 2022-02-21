import React from "react"
import Image from 'next/image'
import admin_portal_gradient from '../public/admin_portal_gradient.png';
import left_heart from '../public/left_heart.png';
import right_heart from '../public/right_heart.png';

function SideBar(
    props: any
) {
    return(
        <div className="w-[318px] flex-col justify-start sm:relative bg-black shadow md:h-full hidden sm:flex">
            <span className="left-0 right-0 w-[318px] h-[81px]">
                <Image className="relative" src={admin_portal_gradient}/>
            </span>
            <span className="absolute top-[26px] left-[33px]">
                <Image className="static px-10" src={left_heart}/>
            </span>
            <span className="absolute top-[26px] left-[49px]">
                <Image className="static px-10" src={right_heart}/>
            </span>
            <span className="absolute top-[29px] left-[82px]">
                <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
                    Admin Portal
                </h1>
            </span>
            <ul className="px-[31px] py-[36px] static">
                {
                    props.items.map((item: any) => (
                        <a href={item.route}>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                            <Image src={item.icon}/>
                                <span className="text-base font-semibold text-white hover:text-slate-400 ml-4">{item.name}</span>
                            </div>
                        </li>
                        </a>
                        
                    ))
                }
            </ul> 
        </div>
    );
                }

export default SideBar;