import RequestCard from "@components/itemRequestsTable/RequestCard"
import { useRouter } from "next/router"
import { useState } from "react"


export default function Items() {

    const router = useRouter()
    const [data, setData] = useState([
        {
          "title": "Baby Clothing",
          "description": "5 baby outfits",
          "additionalInfo": [
             {"title": "Girl"},
             {"title": "18 months"}
           ]
        }
    ])

    return (
        <div className="flex flex-col items-center w-full mt-6 sm:flex-row sm:justify-center sm:items-start">
            <RequestCard title="Current Requests" description="Requests on the way to you and your baby." 
                img="requests_icon.svg" current={true} data={data}></RequestCard>
            <RequestCard title="Request items" description="Request additional items like diapers, baby formula, and clothing." 
                img="babybottle_icon.svg" current={false} onClick={() => router.push("RequestItems")}></RequestCard>        
        </div>
    )
}
