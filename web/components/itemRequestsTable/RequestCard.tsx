import Button from "@components/atoms/Button"

interface Props {
    title: string
    description: string
    img: string
    current: boolean
    onClick?: () => any
    data?: any
}


export default function RequestCard( {title, description, img, current, onClick, data}: Props ) {


    return (
        <div className="w-[20rem] px-6 py-[1.125rem] rounded shadow flex-col justify-start items-start mb-7 sm:mx-5 sm:w-[33rem] sm:mt-12">
            <div className="w-6 h-6 inline-flex">
                <img src={img}></img>
            </div>
            <div className="text-lg font-bold mb-1">
                {title}
            </div>
            <div className="text-dark-gray mb-5">
                {description}
            </div>
            {current &&
                <div className="mb-[0.1rem]">
                    {data.map((data, i) => {
                        return (
                            <div className="flex flex-col">
                                {data['title']}
                                <div className="flex flex-row">
                                    {`${data['description']} - `}
                                    {data.additionalInfo.map((data, i) => {
                                        return (
                                            <div className="pl-1">
                                                {data['title']}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {!current &&
                <Button text="Request"onClick={onClick}></Button>
            }
        </div>
    )
}