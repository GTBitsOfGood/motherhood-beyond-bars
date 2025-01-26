interface Props {
  icon: React.ReactNode;
  onClick: () => any;
  hoverColor?: string;
  clickColor?: string;
  label?: string;
}

export default function IconButton({
  icon,
  onClick,
  hoverColor = "",
  clickColor = "",
  label = "",
}: Props) {
  return (
    // TODO add tooltip, hover color change, and click color change
    <div className="cursor-pointer" onClick={onClick}>
      {icon}
    </div>
  );
}
