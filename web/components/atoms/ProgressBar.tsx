interface Props {
  /** A number between 0 and 100 indicating the progress percentage */
  progress: number;
  width: string;
}

export default function ProgressBar({ progress, width }: Props) {
  return (
    <div
      style={{ width }}
      className={`h-[6px] relative rounded-full bg-empty-gray`}
    >
      <div
        style={{ width: `${progress}%` }}
        className="rounded-full bg-mbb-pink absolute top-0 left-0 bottom-0 transition-all"
      />
    </div>
  );
}
