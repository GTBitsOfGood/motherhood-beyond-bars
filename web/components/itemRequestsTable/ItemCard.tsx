import { useState } from "react"

interface Props {
    data: any
    onChange: (e) => void
}


export default function ItemCard( {data, onChange }: Props ) {

    const [babyChecked, setBabyChecked] = useState(false)
    const [value, setValue] = useState('')

    const checkBoxBaby = () => {
        setBabyChecked(!babyChecked)
    }

    const handleChange = (e) => {
        let val = e.target.value
        setValue(val)
        onChange(val)
    }

    return (
        <div className="w-full rounded shadow p-4 sm:mr-3">     
            {data.map((data, i) => {
                return (
                    <div>
                        <div className="justify-start items-center gap-1 inline-flex">
                            <div className="flex flex-col justify-center items-center w-6 h-6">
                                <input type="checkbox" className="w-4 h-4 bg-secondary-background rounded border border-light-gray" 
                                checked={babyChecked} onChange={checkBoxBaby}></input>
                            </div>
                            <div className="font-semibold">
                                {data["title"]}
                            </div>
                        </div>
                        <div className="text-dark-gray ml-7 my-1">
                            {data["description"]}
                        </div>
                        {babyChecked &&
                            <div className="w-full pl-7 flex-row justify-start items-start inline-flex">
                                {data.additionalInfo.map((data, i) => {
                                    return (
                                        <div className="w-[8rem] flex flex-col pr-2">
                                            {data["title"]}
                                            <input type="text" className="mt-1 px-2 py-2.5 bg-secondary-background rounded border border-light-gray" 
                                                placeholder={data["placeholder"]} onChange={handleChange}>
                                            </input>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>     
                )
            })}   
        </div>
    )
}