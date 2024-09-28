import ErrorTriangle from "@components/Icons/ErrorTriangle";

interface Props {
  error?: string;
}

export default function ErrorText({ error }: Props) {
  return (
    <>
      {error ? (
        <div className="text-sm font-normal text-error-red mt-[0.3125rem]">
          {error}
        </div>
      ) : (
        <div className="mt-[1.5625rem]"></div>
      )}
    </>
  );
}
