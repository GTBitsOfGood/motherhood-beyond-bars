import { useState } from "react";
import TextInput from "@components/atoms/TextInput";


interface Props {
    image: string;
    description?: string;
    edit: true | false
    deselect?: () => void;
    selectImage?: (
      arg0: number,
      arg1: number,
      arg2: number,
      arg3: boolean
    ) => void;
    currentIndexs?: {
      i: number;
      j: number;
      k: number;
    };
  }

export default function BabyModal({ image, description, edit}: Props) {

    const [newDescription, setNewDescription] = useState("");

    return (
        <div className="flex flex-col w-full h-full items-center sm:flex-row">
            <div className={`relative w-full bg-image-gray sm:w-[55%] sm:h-full ${edit ? "flex justify-center items-center" : "flex justify-center h-[65%] sm:items-center"}`}>
                <img
                    src={image}
                    className={`sm:w-[21rem] sm:max-h-[30rem] ${edit ? "max-h-[22rem]" : "w-4/5 object-cover"}`}
                ></img>
                {edit && (
                    <button className="w-[7.563rem] h-[1.688rem] bg-black/70 rounded-[999px] absolute bottom-3 right-3 sm:bottom-8 sm:right-[10.5rem]">
                        <div className="w-[6.188rem] h-5 text-white text-sm font-semibold ml-3">
                            Replace Image
                        </div>
                    </button>
                )}
            </div>
            {edit ? (
                <div className="flex-col w-[20.625rem] h-[14.938rem] justify-start items-start mt-[1.313rem] gap-[1.313rem] inline-flex sm:w-[45%] sm:pl-12 sm:pr-12">
                    <div className="self-stretch text-lg font-bold sm:text-2xl">
                        Add a Description
                    </div>
                    <div className="w-full h-32">                       
                        <TextInput
                            onChange={(event) => {
                                setNewDescription(event);
                            }}
                            placeholder="How the baby is doing, what they did today, etc."
                        ></TextInput>
                    </div>
                    <button className="self-stretch h-[2.813rem] px-4 pt-2 pb-[0.563rem] bg-white rounded border border-mbb-pink justify-center items-center gap-2 inline-flex">
                        <div className="text-mbb-pink font-semibold sm:text-xl">
                            Upload
                        </div>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center mx-7 my-7 sm:w-[40%] sm:text-2xl">
                    <div className="sm:w-2/3">
                        {description}
                    </div>
                </div>
            )}
        </div>
    )
}