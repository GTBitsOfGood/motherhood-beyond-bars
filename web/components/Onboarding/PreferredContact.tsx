import BackButton from "@components/atoms/BackButton";
import { useState } from "react";

interface Props {
  setPage: (arg0: any) => any;
}

export default function PreferredContactPage({ setPage }: Props) {
  return <BackButton />;
}
