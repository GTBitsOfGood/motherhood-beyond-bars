import { useState } from "react"

interface BannerProps {
    text: String;
}

export default function Banner({ text }: BannerProps) {
    const[msg, setMsg] = useState(text);

    if (!msg) {
        return null;
    }

    return (
        <div className="w-full h-11 p-2 bg-white rounded border border-[#e50606] justify-start items-start gap-2 inline-flex mb-[2%] sm:mb-[6%]">
            <div className="w-4 h-4 relative">
                <img src="/warning.svg"></img>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div className="self-stretch text-[#e50606] text-[10px] font-semibold font-opensans">
                    {text}
                </div>
            </div>
            <div className="w-4 h-4 justify-center items-center flex">
                <button onClick={() => setMsg("")} className="w-4 h-4 relative flex-col justify-start items-start flex">
                    <img src="/x.svg"></img>
                </button>
            </div>
        </div>
    )
}