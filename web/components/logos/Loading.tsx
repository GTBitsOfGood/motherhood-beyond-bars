

export default function LoadingScreen() {

    return (
        <div className="flex flex-col bg-custom-background w-full h-screen justify-center items-center">
            <div className="flex flex-row relative w-full h-[10%] justify-center mb-[10%] sm:w-[17%] sm:h-[13%] sm:mb-[5%]">
                <img src = '/MBBLogo.svg' className="shrink-0 stroke-[2.1px] object-contain sm:stroke-[3px]"></img>
            </div>
            <div className="flex flex-col w-full h-[10%] justify-center shrink-0">
                <p className="text-white text-center font-opensans text-3xl font-bold tracking-wide uppercase sm:text-4xl">
                    Motherhood <br /> Beyond bars
                </p>
            </div>
        </div>
    )
}