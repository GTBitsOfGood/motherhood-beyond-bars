import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { encrypt } from "@lib/utils/encryption";
import { Baby } from "@lib/types/baby";

import Button from "@components/atoms/Button";
import LockIcon from "@components/Icons/LockIcon";
import TitleTopBar from "@components/logos/TitleTopBar";
import { getWaivers } from "db/actions/shared/Waiver";
import { BrowserWaiver } from "@lib/types/common";
import { auth } from "db/firebase";
import { Timestamp } from "@firebase/firestore";
import MarkdownIt from "markdown-it";
import CheckboxText from "@components/molecules/CheckboxText";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "@components/atoms/DatePicker";
import TextInput from "@components/atoms/TextInput";
import { caregiverFromAuthToken } from "db/actions/admin/Caregiver";
import { useState } from "react";
import RightChevronIcon from "@components/Icons/RightChevronIcon";
import { numberFormatDate } from "@lib/utils/date";

interface Props {
  books: { name: string; birthday: string; bookLink: string }[];
  mediaReleaseWaiver: BrowserWaiver | null;
  signedMediaRelease: boolean;
}

const mdRender = new MarkdownIt();

// TODO add topbar and merge designs

export default function BabyBookHome({
  books,
  mediaReleaseWaiver,
  signedMediaRelease,
}: Props) {
  const form = useForm<{ agreed: boolean; date: Date; signature: string }>({
    defaultValues: {
      agreed: false,
      date: new Date(),
      signature: "",
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [notSigning, setNotSigning] = useState(false);
  const showForm = !signedMediaRelease && !notSigning;
  const router = useRouter();

  if (books.length === 0) {
    return (
      <div className="w-full h-full">
        <TitleTopBar title="Baby Book" />
        <div className="flex flex-col my-[3.75rem] mx-auto px-[3.5rem] items-center gap-[1.125rem] max-w-[530px]">
          <div className="rounded-full w-[160px] h-[160px] flex items-center justify-center bg-[#F2F2F2]">
            <LockIcon />
          </div>
          <p className="text-lg sm:text-2xl font-bold text-dark-gray">
            Restricted Access
          </p>
          <p className="sm:text-xl text-center text-dark-gray">
            Looks like your account is not assigned to a child yet!
            <br />
            <br />
            Once the child is in your care,{" "}
            <a className="no-underline text-mbb-pink font-semibold">
              contact us
            </a>{" "}
            to set up account features for you and the child.
          </p>
        </div>
      </div>
    );
  }

  // TODO update logic
  if (books.length === 0) {
    if (showForm) {
      if (!mediaReleaseWaiver) {
        return (
          <div className="w-full h-full relative">
            <TitleTopBar title="Baby Book" />
            <p>Could not get Media Release Form!</p>
          </div>
        );
      }

      return (
        <div className="w-full h-full relative">
          {showModal && (
            <div
              className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-end sm:items-center sm:justify-center bg-[#00000040]"
              onClick={(e) => {
                // If click didn't originate in this element, ignore it
                if (e.target !== e.currentTarget) return;
                setShowModal(false);
              }}
            >
              <div className="bg-white w-full md:w-[500px] sm:rounded p-4">
                <p className="self-start text-lg sm:text-2xl font-bold text-primary-text">
                  Don&apos;t Share?
                </p>
                <p className="mt-2">
                  Proceeding without agreeing to the Media Release Form
                  restricts Motherood Beyond Bars from sharing any photos for
                  media use.
                </p>
                <p className="mt-2 font-bold">
                  You can agree to this form at any time in the Resource
                  Library.
                </p>
                <div className="flex gap-4 mt-2">
                  <Button
                    text="Agree to Form"
                    onClick={() => setShowModal(false)}
                  />
                  <button
                    className="text-mbb-pink font-bold w-full"
                    onClick={() => {
                      setShowModal(false);
                      setNotSigning(true);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          <TitleTopBar title="Baby Book" />
          <div className="p-4">
            <p className="self-start text-2lg sm:text-3xl font-bold text-primary-text">
              Media Release Form
            </p>
            <div className="flex flex-col w-full items-center mt-4">
              <div className="flex flex-col items-center md:max-w-[800px] gap-2">
                <div
                  className="bg-secondary-background border border-light-gray overflow-auto shrink-0 py-2 px-3 max-h-[300px]"
                  dangerouslySetInnerHTML={{
                    __html: mdRender.render(mediaReleaseWaiver.content),
                  }}
                />
                <Controller
                  name="agreed"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <CheckboxText
                      label="I agree to the Media Release Form"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <TextInput
                    label="Signature"
                    error={form.formState.errors.signature?.message}
                    formValue={form.register("signature", {
                      validate: (v) =>
                        !v ? "Signature cannot be empty" : true,
                    })}
                  />
                  <Controller
                    control={form.control}
                    name="date"
                    rules={{
                      validate: (v) => (!v ? "Date cannot be empty" : true),
                    }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        label="Date"
                        value={value}
                        onChange={onChange}
                        disabled
                        error={form.formState.errors.date?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <Button
                text="Next"
                width="auto"
                onClick={async () => {
                  const isValid = await form.trigger(undefined, {
                    shouldFocus: true,
                  });

                  if (!isValid) return;

                  // Update the user record to have signed
                  const res = await fetch("/api/sign-waiver", {
                    method: "POST",
                    body: JSON.stringify(mediaReleaseWaiver),
                  });
                }}
              />
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 font-semibold mt-4"
              >
                Continue without signing <RightChevronIcon color="black" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full">
        <TitleTopBar title="Baby Book" />
        <div className="flex flex-col my-[3.75rem] mx-auto px-[3.5rem] items-center gap-[1.75rem] max-w-[530px]">
          <p className="self-start text-2lg sm:text-3xl font-bold text-primary-text">
            Start a Baby Book
          </p>
          <p className="sm:text-xl">
            The Baby Book is a place where you can document the baby&#39;s
            journey by uploading images and descriptions. Motherhood Behind Bars
            will then deliver the images to the mothers, so they can stay
            updated on their baby&#39;s growth.
          </p>
          <Button text="Get Started" />
        </div>
      </div>
    );
  }

  if (books.length === 1) {
    router.push(books[0].bookLink);
  }

  return (
    <div className="w-full h-full">
      <TitleTopBar title="Baby Book" />
      <div className="flex flex-col my-[3.75rem] px-[3.5rem] gap-[1.375rem] w-full">
        <p className="self-start text-2xl sm:text-3xl font-bold text-primary-text">
          Current Baby Books
        </p>
        <div className="flex flex-col items-stretch md:grid md:grid-cols-2 gap-[1.375rem] md:gap-12 md:px-10">
          {books.map(({ name, birthday, bookLink }) => (
            <a
              key={bookLink}
              href={bookLink}
              className="flex-col px-4 md:px-10 py-2 md:py-6 cursor-pointer rounded border border-dark-gray text-dark-gray hover:border-mbb-pink hover:text-mbb-pink"
            >
              <p className="md:text-[1.375rem] font-bold">{name}</p>
              <p className="text-sm md:text-xl text-dark-gray">
                Birthday: {birthday}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const MEDIA_RELEASE_WAIVER_NAME = "Media Release";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const caregiver = await getCurrentCaregiver(context);

  if (!caregiver) {
    return {
      props: {
        books: [],
        signedMediaRelease: false,
        mediaReleaseWaiver: null,
      },
    };
  }

  const waivers = await getWaivers();
  const mediaReleaseWaiver = waivers.find(
    (w) => w.name === MEDIA_RELEASE_WAIVER_NAME
  );
  const signedMediaRelease =
    caregiver?.signedWaivers?.some(
      (w) => w.name === MEDIA_RELEASE_WAIVER_NAME
    ) ?? false;

  const books = caregiver.babies.map((baby) => {
    baby = baby as Baby;
    const { iv, content } = encrypt(baby.id);

    return {
      name: baby.firstName,
      // Handle (probably mistaken) case where dob is a string
      birthday: !(baby.dob instanceof Timestamp)
        ? (baby.dob as string)
        : numberFormatDate(baby.dob.toDate()),
      bookLink: `/caregiver/book/${content}?iv=${iv}`,
    };
  });

  return {
    props: {
      books,
      signedMediaRelease,
      mediaReleaseWaiver: mediaReleaseWaiver
        ? {
            ...mediaReleaseWaiver,
            lastUpdated: (mediaReleaseWaiver.lastUpdated as Timestamp)
              .toDate()
              .toISOString(),
          }
        : null,
    },
  };
};
