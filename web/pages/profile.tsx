import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@lib/firebase";
import { getAuth, updateProfile } from "firebase/auth";

function CreateProfile() {

    const initialState = {
        stage: 0,
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        phoneNumber: "",
        email: "",
        numAdults: "",
        numChildren: "",
        agesOfChildren: "",
        contactMode: ""
    }

    const [
        { stage, firstName, lastName, streetAddress, city,
            state, zip, phoneNumber, email, numAdults,
            numChildren, agesOfChildren, contactMode }, setState
    ] = useState(initialState);

    const clearState = () => {setState({...initialState})};

    const onChange = e => {
        let { name, value } = e.target;
        if (name === 'radio') name = 'contactMode'
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const nextStage = () => setState(prevState => ({ ...prevState, stage: stage + 1 }));

    const isValidZipCode = (str: string) => /^\d{5}(-\d{4})?$/.test(str);

    const isValidPhoneNumber = (str: string) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(str);

    const isValidEmail = (str: string) => /\S+@\S+\.\S+/.test(str);

    async function handleSubmit(e: any) {
        e.preventDefault();
        const caregiver = `Caregiver ${Math.floor(Math.random()*90000) + 10000}`;
        const auth = getAuth();
        try {
            await setDoc(doc(db, "caregivers", caregiver), {
                "firstName": firstName,
                "lastName": lastName,
                "streetAddress": streetAddress,
                "city": city,
                "state": state,
                "zipCode": zip,
                "phoneNumber": phoneNumber,
                "email": email,
                "numAdults": numAdults,
                "numChildren": numChildren,
                "agesOfChildren": agesOfChildren,
                "contactMode": contactMode
        }); 
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`
                });
            }
            console.log("added new caregiver");
            clearState();
        } catch (e) {
            console.error("Error adding caregiver: ", e);
        }
        
    }

    const content = () => {
        switch (stage) {
            case 0: 
                return (
                    <form class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="flex justify-center -mx-3 mb-3">
                            <label class="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="page-1-title">
                                Create your account
                            </label>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    First Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                 focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" 
                                 name="firstName" onChange={onChange}/>
                                {!firstName && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"
                                name="lastName" onChange={onChange}/>
                                {!lastName && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-street-address">
                                    Street Address
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-street-address" type="text"
                                name="streetAddress" onChange={onChange}/>
                                {!streetAddress && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                    City
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-city" type="text"
                                name="city" onChange={onChange}/>
                                {!city && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    State
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-state" type="text"
                                name="state" onChange={onChange}/>
                                {!state && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Zip Code
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-zip" type="text"
                                name="zip" onChange={onChange}/>
                                {!zip && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-phone-number">
                                    Phone Number
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-phone-number" type="text"
                                name="phoneNumber" onChange={onChange}/>
                                {!phoneNumber && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                    Email
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-email" type="text"
                                name="email" onChange={onChange}/>
                                {!email && <p class="text-red-500 text-xs italic">Please fill out this field</p>}
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
                            border-gray-400 rounded shadow" type="button" 
                            onClick={()=> {
                                if (firstName && lastName && streetAddress && city && state && isValidZipCode(zip)
                                && isValidPhoneNumber(phoneNumber) && isValidEmail(email)) {
                                    nextStage();
                                    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
                                }
                            }}>
                                Continue
                            </button>
                        </div>
                    </form>
                );
            case 1: 
                return (
                    <form class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="flex justify-center -mx-3 mb-3">
                            <label class="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="page-2-title">
                                Household Information
                            </label>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-num-adults" value={"something"}>
                                    Number of Adults
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-num-adults" type="text"
                                name="numAdults" onChange={onChange}/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-num-children">
                                    Number of Children (Current)
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-num-children" type="text"
                                name="numChildren" onChange={onChange}/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-children-ages">
                                    Ages of Children
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
                                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none
                                focus:bg-white focus:border-gray-500" id="grid-children-ages" type="text"
                                name="agesOfChildren" onChange={onChange}/>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
                            border-gray-400 rounded shadow" type="button" 
                            onClick={()=>nextStage()}>
                                Continue
                            </button>
                        </div>
                    </form>
                );
            case 2:
                return (
                    <form class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="flex justify-center -mx-3 mb-3">
                            <label class="block tracking-wide text-gray-700 text-lg font-bold mb-2" for="page-3-title">
                                What's the best way to contact you?
                            </label>
                        </div>
                        <div class="mt-2 mb-3">
                            <div>
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio" name="radio" value="phone" defaultChecked onClick={onChange}/>
                                    <span class="ml-2">Phone</span>
                                </label>
                            </div>
                            <div>
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio" name="radio" value="text"
                                    onClick={onChange}/>
                                    <span class="ml-2">Text</span>
                                </label>
                            </div>
                            <div>
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio" name="radio" value="email"
                                    onClick={onChange}/>
                                    <span class="ml-2">Email</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
                            border-gray-400 rounded shadow" type="button" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                );
            default: 
                return null;
        }
    }
    return (
        <div id="signup" class="flex flex-col justify-center items-center">
            {content()} 
        </div>
    )
}

export default CreateProfile;

