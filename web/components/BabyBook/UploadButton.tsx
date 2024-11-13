

export default function UploadButton() {

    return (
        <div className="fixed bottom-0 right-0 mb-10 mr-10 sm:mb-20 sm:mr-20">
            <button className="flex flex-row w-16 justify-end relative">
                <img
                    src="/PinkEllipse.svg"
                    className="absolute -top-10 -right-[0.7rem]"
                />
                <img
                    src="/Plus.svg"
                    className="absolute -top-7"
                />
            </button>
        </div>
    )
}