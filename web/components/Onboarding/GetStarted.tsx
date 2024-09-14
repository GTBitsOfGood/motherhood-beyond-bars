import Button from "@components/atoms/Button";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export default function GetStartedPage({ setPage }: Props) {
  return (
    <div className="flex flex-col flex-grow">
      <div className="lg:hidden flex flex-col shrink-0 py-7 gap-4 items-center justify-center bg-onboarding-background">
        <img
          src="/MBBLogo.svg"
          className="stroke-[2.1px] object-contain sm:stroke-[3px]"
        />
        <span className="text-white text-xl font-bold font-opensans tracking-[0.6px]">
          Caregiver
        </span>
      </div>
      <div className="flex flex-col p-7 gap-[1.125rem]">
        <h1 className="text-primary-text text-2xl font-bold font-opensans">
          Let's get started
        </h1>
        <p>
          Motherhood Beyond Bars is here to provide whole family support for
          mothers, infants, and caregivers like yourself!
        </p>
        <p>
          Before we get started, we’ll need to collect some information to best
          meet your needs. If you have any questions, please email us at{" "}
          <strong className="font-semibold">info@motherhoodbeyond.org</strong>{" "}
          or call us at <strong className="font-semibold">678-404-1397</strong>.
        </p>
        <div className="flex-grow" />
        <Button type="primary" text="Get Started" onClick={() => setPage(1)} />
      </div>
    </div>
  );
}
