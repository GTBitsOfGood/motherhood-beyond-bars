import { atom } from "jotai";

export const pageAtom = atom(3);
export const bbCheckedAtom = atom(false); // for Begin Box
export const csCheckedAtom = atom(false); // for Car Seat
export const spsCheckedAtom = atom(false); // for Safe Place to Sleep
export const bcCheckedAtom = atom(false); // for Baby Clothing
export const additionalRequestsAtom = atom("");

export const numAdultsAtom = atom("");
export const numChildrenAtom = atom("");
export const agesChildrenAtom = atom("");