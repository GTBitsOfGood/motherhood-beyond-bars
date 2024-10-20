import BackButton from "@components/atoms/BackButton"

interface Props {
    backButton: boolean
}

export default function TopBar( {backButton}: Props) {
    
    return (
        <div className="flex flex-row justify-center items-center w-[23.5rem] h-[4.125rem] bg-custom-background sm:w-full sm:h-[5.1rem]">
            {backButton ?
                <BackButton></BackButton>
            :
                <button className="flex flex-row justify-start w-[1.313rem] h-4 ml-6 sm:w-0">
                    <img src="/hamburger.svg"></img>
                </button>
            }
            <div className="w-full text-center text-white text-lg font-semibold mr-[2.813rem] sm:text-2xl sm:mr-5">
                Resources
            </div>
        </div>
    )
}