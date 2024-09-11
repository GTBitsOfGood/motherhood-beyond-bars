

// interface Props {
//   text: string;
//   type?: "primary" | "secondary";
//   onClick?: () => any;
//   submit?: boolean;
//   icon?: React.ReactNode;
//   disabled?: boolean;
// }

// export default function Button({
//   text,
//   type = "primary",
//   onClick,
//   submit = false,
//   icon = undefined,
//   disabled = false,
// }: Props) {
//   return (
//     <button
//       className={`
//         flex bg-background justify-center items-center w-full px-4 pt-2 pb-[9px]
//         ${type == "primary" ? " border border-mbb-pink rounded " : null}
//       `}
//       onClick={onClick}
//       disabled={disabled}
//       type={submit ? "submit" : "button"}
//     >
//       {icon ? <span className="mt-1 mr-2">{icon}</span> : null}
//       <span className="text-base font-semibold text-mbb-pink">{text}</span>
//     </button>
//   );
// }

interface Props {
  text: string;
  type?: "Google";
  onClick?: () => any;
}

export default function Button({ text, type, onClick }: Props) {
  const googleStyles = "w-[47%] text-black text-xs font-bold font-opensans text-start"
  const normalStyles = "w-full text-mbb-pink px-4 pt-2 pb-[9px] text-base font-semibold font-opensans border border-mbb-pink rounded gap-2"

  return (
    <div className="flex flex-row w-full h-full justify-center items-center">
      {type === "Google" && (
        <div className="flex justify-end w-1/5">
          <img src = "/GoogleImage.png" className="w-full h-auto object-contain"></img>
        </div>
      )}
      <button onClick={onClick} className={`${type === "Google" ? googleStyles : normalStyles}`}>{text}</button>
    </div>
  );
}