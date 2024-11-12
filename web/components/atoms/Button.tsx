interface Props {
  text: string;
  type?: "primary" | "secondary" | "Google";
  onClick?: () => any;
  submit?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  width?: string | number;
}

export default function Button({
  text,
  type = "primary",
  onClick,
  width,
  disabled = false,
  submit = false,
  icon = undefined,
}: Props) {
  let styles = "";

  if (disabled) {
    styles =
      "text-base font-opensans text-icon-gray border border-icon-gray px-4 pt-2 pb-[0.5625rem] rounded gap-2";
  } else if (type === "Google") {
    styles =
      "w-60 text-primary-text font-opensans text-start text-sm sm:text-base";
  } else {
    styles = `text-mbb-pink px-4 pt-2 pb-[0.5625rem] text-base font-opensans border-mbb-pink rounded gap-2 hover:bg-mbb-pink-hover active:bg-mbb-pink active:text-white active:stroke-white`;
    if (type === "primary") {
      styles += " border";
    }
  }

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center font-semibold ${styles}`}
      disabled={disabled}
      type={submit ? "submit" : "button"}
      style={{ width }}
      title={text}
    >
      {icon ? <span>{icon}</span> : null}
      {type === "Google" && (
        <div className="flex justify-end w-1/5 -ml-8">
          <img
            src="/GoogleImage.png"
            className="w-full h-auto object-contain"
          />
        </div>
      )}
      <span className="line-clamp-1">{text}</span>
    </button>
  );
}
