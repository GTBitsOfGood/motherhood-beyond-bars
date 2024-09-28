import { Dispatch, SetStateAction } from "react";
import Button from "@components/atoms/Button";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export default function GetStartedPage({ setPage }: Props) {
  return (
    <div className="flex flex-col w-[90%] sm:w-[60%] py-6 px-2 sm:p-7 gap-[1.125rem]">
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center">
        Let&#39;s get started
      </h1>
      <p className="sm:text-center">
        Motherhood Beyond Bars is here to provide whole family support for
        mothers, infants, and caregivers like yourself!
      </p>
      <p className="sm:text-center">
        Before we get started, we&#39;ll need to collect some information to
        best meet your needs. If you have any questions, please email us at{" "}
        <strong className="font-semibold">
          info@
          <wbr />
          mother
          <wbr />
          hood
          <wbr />
          beyond
          <wbr />
          .org
        </strong>{" "}
        or call us at <strong className="font-semibold">678-404-1397</strong>.
      </p>
      <div className="flex-grow" />
      <Button type="primary" text="Get Started" onClick={() => setPage(1)} />
    </div>
  );
}
