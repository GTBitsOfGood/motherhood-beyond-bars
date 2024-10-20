import { useState } from "react"


interface Props {
    title: string
    description: string
    showDesc: boolean
}

export default function QuestionAnswer( {title, description, showDesc}: Props ) {

    const [showDescription, setShowDescription] = useState(showDesc)

    let action = () => {
        setShowDescription(showDescription => !showDescription)
    }

    return (
        <button className="px-3 pt-2.5 pb-[0.563rem] bg-white rounded shadow justify-center items-center gap-6 text-start mb-6 sm:w-[65rem]" onClick={action}>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="w-[15.75rem]">
                        {title}
                    </div>
                    <img className="h-[1.688rem] relative flex-col justify-start items-start flex" src={showDescription ? "\KeyboardUpArrow.svg" : "\KeyboardDownArrow.svg"}>
                    </img>
                </div>
                {showDescription && (
                    <div className="w-[15.6rem] break-words text-dark-gray sm:w-[55.625rem]">
                        {description}
                    </div>
                )}
            </div>          
        </button>
    )
}