import React from "react"

function SideBar(
    props: any
) {
    return(
        <div className="px-8 w-65 flex-col justify-start absolute sm:relative bg-black shadow md:h-full hidden sm:flex">
            <div className="h-16 w-full flex items-center">
                <h1 className="text-md text-center font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                    Admin Portal
                </h1>
            </div>
            <ul>
                {
                    props.items.map((item: any) => (
                        <a href={item.route}>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                            <img src={item.icon}/>
                                <span className="text-base  ml-4">{item.name}</span>
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