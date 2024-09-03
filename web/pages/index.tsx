import { Account, Caregiver } from "@lib/types/users";
import { createCaregiverAccount } from "db/actions/SignUp";
import { updateCaregiver } from "db/actions/caregiver/Caregiver";

export default function Index() {
    return (
        <div>
            <button
            onClick={() => {
                const caregiver: Partial<Caregiver> = {
                    numAdults: 1,
                    numChildren: 1,
                    signedWaivers: [],
                    address: "5 Cramer Drive",
                    city: "Chester",
                    state: "NJ",
                    zipCode: "07930",
                    contact: "Email",
                };

                updateCaregiver("Ufnn7fOKQKSeGAe54tpHEaGVGUl2", caregiver);
            }}>
                Click me
            </button>
        </div>
    )
}