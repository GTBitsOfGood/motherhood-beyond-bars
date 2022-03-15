import { BabyBook, BabyBookMonths, BabyImage } from "pages/book/[babyId]"

const PictureArray = ({ babyBook } : Props) => {
  return (
    <div>
      {Object.entries(babyBook).map(([year, months] : [string, BabyBookMonths]) => {
        return (
          <div key={year}>
            {Object.entries(months).map(([month, images] : [string, BabyImage[]]) => {
              return (
                <div key={month}>
                  {images.map((image, i) => {
                    return (
                      <div key={i}>
                        image
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

interface Props {
  babyBook: BabyBook
}

export default PictureArray
