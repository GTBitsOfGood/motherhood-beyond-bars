import { monthIndexToString } from "@lib/date"
import Image from "next/image"
import { BabyBookYear, BabyImage } from "pages/book/[babyId]"

const PictureArray = ({ babyBook } : Props) => {
  return (
    <div className="overflow-auto grow p-12">
      {babyBook.map((year) => {
        return (
          <div key={year.year} className="mb-10">
            <h1 className="text-3xl font-semibold mb-4">{year.year}</h1>
            {year.months.map((month) => {
              return (
                <div key={month.month}>
                  <h2 className="font-semibold mb-2">{monthIndexToString(month.month)} {year.year}</h2>
                  <div className="flex flex-wrap">
                    {month.images.map((image, i) => 
                      <BabyBookImage image={image} key={i}/>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const BabyBookImage = ({ image }: { image: BabyImage }) => {
  return (
    <div className="w-[200px] h-[300px] overflow-hidden relative shadow-lg rounded mx-3 my-3">
      <Image src={image.imageUrl} layout={'fill'} objectFit={'cover'}/>
      {image.caption && <p className="absolute bottom-0 line-clamp-3 text-ellipsis bg-white w-full min-h-[4.5rem]">{image.caption}</p>}
    </div>
  )
}

interface Props {
  babyBook: BabyBookYear[]
}

export default PictureArray
