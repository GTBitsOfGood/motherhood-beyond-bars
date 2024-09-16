import ErrorTriangle from "@components/Icons/ErrorTriangle";

interface Props {
  error?: string;
}

export default function ErrorText({ error }: Props) {
  return (
    <div className="flex items-center gap-2 text-[#FF3939] h-6">
      {error && (
        <>
          <ErrorTriangle />
          <span>{error}</span>
        </>
      )}
    </div>
  );
}
