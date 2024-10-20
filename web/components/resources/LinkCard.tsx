import { useState } from "react"


interface Props {
    title: string
    description: string
    URL: string
}

export default function LinkCard( {title, description, URL}: Props ) {

    return (
        <div className="w-[21.5rem] px-3 justify-center items-center gap-6 text-start sm:w-[66.5rem]">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="w-[15.75rem]">
                        {title}
                    </div>
                    <img className="h-[1.688rem] relative flex-col justify-start items-start flex">
                    </img>
                </div>
                <div className="w-[15.6rem] break-words text-dark-gray py-1 sm:w-[55.625rem]">
                    {description}
                </div>
                <a href={URL} className="text-mbb-pink font-semibold">{URL}</a>
                <div className="h-[0px] border border-light-gray my-4"></div>
            </div>          
        </div>
    )
}