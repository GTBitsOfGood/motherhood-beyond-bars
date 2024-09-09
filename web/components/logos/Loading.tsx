import React from "react"

export default function LoadingScreen() {
    
    return (
        <div className="flex flex-col bg-custom-background w-full h-screen justify-center items-center">
            <div className="flex flex-row relative w-full h-[10%] justify-center mb-[10%]">
                <img src = '/MBBLogo.png' className="shrink-0 stroke-[2.1px]"></img>
            </div>
            <div className="flex flex-col w-full h-[10%] justify-center shrink-0">
                <p className="text-white text-center font-opensans text-[30px] font-bold leading-normal tracking-[0.9px] uppercase">
                    Motherhood
                </p>
                <p className="text-white text-center font-opensans text-[30px] font-bold leading-normal tracking-[0.9px] uppercase">
                    Beyond bars
                </p>
            </div>
        </div>
    )
}