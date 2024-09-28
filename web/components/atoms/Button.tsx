interface Props {
  text: string;
  type?: "primary" | "secondary" | "Google";
  onClick?: () => any;
  submit?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  text,
  type = "primary",
  onClick,
  disabled = false,
  submit = false,
  icon = undefined,
}: Props) {
  const googleStyles =
    "w-60 text-primary-text font-opensans text-start text-sm sm:text-base";
  const primarySyles =
    "text-mbb-pink px-4 pt-2 pb-[0.5625rem] text-base font-opensans border border-mbb-pink rounded gap-2";
  const styles =
    type === "primary" ? primarySyles : type === "Google" ? googleStyles : null;

  return (
    <div className="flex flex-row justify-center">
      <button
        onClick={onClick}
        className={`flex flex-row w-full h-full justify-center items-center font-semibold ${styles}`}
        disabled={disabled}
        type={submit ? "submit" : "button"}
      >
        {icon ? <span className="mt-1 mr-2">{icon}</span> : null}
        {type === "Google" && (
          <div className="flex justify-end w-1/5 -ml-8">
            <img
              src="/GoogleImage.png"
              className="w-full h-auto object-contain"
            ></img>
          </div>
        )}
        {text}
      </button>
    </div>
  );
}
