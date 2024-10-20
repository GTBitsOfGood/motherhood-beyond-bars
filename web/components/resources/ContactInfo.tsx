

export default function ContactInfo() {

    return (
        <div className="w-[20.438rem] h-[23.25rem] px-6 py-6 mt-3 bg-white rounded shadow flex-col justify-start items-start inline-flex sm:w-[28.813rem] sm:h-[27.313rem]">
            <img src="/MessageTextIcon.svg"></img>
            <div className="w-full text-lg font-bold py-2">
                Reach out to us!
            </div>
            <div className="w-full text-dark-gray">
                We know childcare isn’t the easiest, but we’re here to help. Let us know if you have any questions, concerns, feedback, or just want to chat.
            </div>
            <div className="flex flex-row pt-3 sm:pt-5">
                <img src="/CellphoneIcon.svg"></img>
                <div className="flex flex-col justify-center items-start pl-6">
                    <div className="text-dark-gray text-sm font-semibold">
                        Text
                    </div>
                    (678) 404-1397             
                </div>
            </div>
            <div className="flex flex-row pt-3 sm:pt-5">
                <img src="/MailIcon.svg"></img>
                <div className="flex flex-col justify-center items-start pl-6">
                    <div className="text-dark-gray text-sm font-semibold">
                        Email
                    </div>
                    info@motherhoodbeyond.org     
                </div>
            </div>
            <div className="flex flex-row pt-3 sm:pt-5">
                <img src="/PhoneIcon.svg"></img>
                <div className="flex flex-col justify-center items-start pl-6">
                    <button className="h-[2.813rem] px-4 rounded border border-mbb-pink justify-center items-center">
                        <div className="text-mbb-pink font-semibold">
                            Call on Google Voice
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}