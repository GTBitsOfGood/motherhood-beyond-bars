
import BabyModal from "@components/BabyBook/BabyModal";


export default function BabyBookScreen() {
    

    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col bg-custom-background w-full h-20 justify-center items-center">
                <div className="flex flex-row w-full items-center">
                    <button className="ml-7 h-3.5 w-[21px]">
                        <img
                            src="/HamburgerIcon.svg"
                        />
                    </button>
                    <div className="flex-grow flex justify-center">
                        <img
                            src="/MBBLogo.svg"
                            className="h-10"
                        />
                    </div>
                    <div className="w-[21px] mr-7"></div>
                </div>
            </div>
            <BabyModal image={"/ExampleBaby.svg"} edit={true} description="Jordan waking from her afternoon nap! She’s been growing so fast, it’s insane. Her favorite stuffed animal is this white bear she calls “baba”."></BabyModal>
        </div>
    )
}