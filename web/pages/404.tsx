

export default function Error404Page() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center">
                <img src="/4.svg" className="sm:w-[7.5rem]"></img>
                <img src="/babybottle_outline.svg" className="sm:w-[12rem]"></img>
                <img src="/4.svg" className="sm:w-[7.5rem]"></img>
            </div>
            <div className="text-mbb-pink text-lg font-semibold mt-4 sm:text-4xl sm:mt-7">
                Oops! You ran out of formula!
            </div>
            <div className="text-mbb-pink text-xs font-normal mt-2 sm:text-2xl sm:mt-4">
                This page does not exist or has been moved
            </div>
        </div>
    )
}