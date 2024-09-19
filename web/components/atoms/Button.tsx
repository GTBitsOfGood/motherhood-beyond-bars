

interface Props {
  text: string;
  type?: "primary" | "secondary" | "Google";
  onClick?: () => any;
  submit?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({ text, type, onClick }: Props) {
  const googleStyles = "w-60 text-primary-text text-xs font-opensans text-start sm:text-base"
  const normalStyles = "text-mbb-pink px-4 pt-2 pb-[0.5625rem] text-base font-opensans border border-mbb-pink rounded gap-2"

  return (
    <div className="flex flex-row justify-center">
      <button onClick={onClick} className={`flex flex-row w-full h-full justify-center items-center font-semibold ${type === "Google" ? googleStyles : normalStyles}`}>
        <div className={`${type === "Google" ? "flex justify-end w-1/5 -ml-8" : ""}`}>
          {type === "Google" && (
            <div className="">
              <img src = "/GoogleImage.png" className="w-full h-auto object-contain"></img>
            </div>
          )}
        </div>
        {text}
      </button>
    </div>
    
  );
}