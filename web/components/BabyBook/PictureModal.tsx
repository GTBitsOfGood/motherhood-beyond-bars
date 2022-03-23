import Image from "next/image"
import { BabyImage } from "pages/book/[babyId]"

const PictureModal = ({ image, deselect } : { image: BabyImage | undefined, deselect: ()=>void}) => {
  if (image === undefined) return (<div className="absolute">No Image Found. There is probably an error.</div>)
  return (
    <div className="absolute flex flex-col align-center w-full h-full bg-white">
      <div className="flex">
        <div className="flex cursor-pointer" onClick={() => deselect()}>
          <div>icon</div>
          <p>Back to Album</p>
        </div>
      </div>
      <div className="flex w-full justify-between flex-grow">
        <div className="flex flex-grow">
          <div>left</div>
          <div className="relative flex-grow">
            <Image src={image.imageUrl} layout={'fill'} objectFit={'contain'} />
          </div>
          <div>right</div>
        </div>
        <div>
          <h3>date</h3>
          <p>caption</p>
          <button>button</button>
        </div>
      </div>
    </div>
  )
}

export default PictureModal
