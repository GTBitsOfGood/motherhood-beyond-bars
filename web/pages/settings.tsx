import React, { useState } from "react";

function genSettingsTab() {
    const initialState = {
        phoneNumber: "N/A"
    }

    const [ { phoneNumber }, setState ] = useState(initialState);

    const isValidPhoneNumber = (str: string) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(str);

    const onSubmit = () => {
        if (isValidPhoneNumber(newNumber)) {
            setState({ phoneNumber : newNumber });
            document.getElementById("phoneInput").value = "";
        }
    }

    let newNumber = "";

    return (
        <div className="px-8 flex h-full flex-col justify-left">
            <h1 className="text-2xl mb-5 font-bold">Settings</h1>
            <h2 className="text-md mb-5 font-bold">Current Phone Number: {phoneNumber}</h2>
            <h2 className="text-md mb-5 font-bold">Update Phone Number</h2>
            <form class="w-full max-w-sm">
                <div class="flex items-center border-b py-2">
                    <input id="phoneInput" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Phone Number" aria-label="Phone number" onChange={(e)=>newNumber=e.target.value}/>
                    <button class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="button"
                        onClick={(e)=>onSubmit(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default genSettingsTab;