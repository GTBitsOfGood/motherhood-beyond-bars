

export default function Toast() {

    return (
        <div className="w-[20.5rem] h-[2.625rem] pl-[1.125rem] pr-[10.813rem] py-2.5 bg-[#ebedf8] rounded justify-start items-center gap-[1.125rem] inline-flex">
            <div className="w-[1.125rem] h-[1.125rem] justify-center items-center inline-flex">
                <div className="w-[1.125rem] h-[1.125rem] relative flex-col justify-start items-start flex">
                    <img src="/check.svg"/>
                </div>
            </div>
            <div className="text-mbb-pink">Photo added.</div>
        </div>
    )
}