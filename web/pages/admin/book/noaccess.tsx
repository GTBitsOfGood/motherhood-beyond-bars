

export default function NoAccessScreen() {
    
    return (
        <div className="flex flex-col w-full items-center h-1/2 mt-16 pl-12 pr-12 sm:mt-28">
            <div className="flex flex-col w-full items-center relative">
                <img
                    src = "/Ellipse.svg"
                    className="sm:w-48"
                ></img>
                <img
                    src = "/LockIMG.svg"
                    className="absolute top-8 sm:w-24"
                ></img>
            </div>
            <div className="text-center text-dark-gray text-lg font-bold mt-5 mb-5 sm:mt-8 sm:mb-10">
                Restricted Access
            </div>
            <div className="text-center">
                <span className="text-dark-gray text-base">
                    Looks like your account is not assigned to a child yet!
                    <br/><br/>
                    Once the child is in your care,
                    <br/>
                </span>
                <button className="text-mbb-pink text-base font-semibold pl-1 pr-1">
                    contact us
                </button>
                <span className="text-dark-gray text-base"> 
                    to set up account features for you and the child.
                </span>
            </div>
        </div>
    )
}