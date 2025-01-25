import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MarkdownIt from "markdown-it";
import { Timestamp } from "@firebase/firestore";

import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { getWaivers } from "db/actions/shared/Waiver";

import { encrypt } from "@lib/utils/encryption";
import { numberFormatDate } from "@lib/utils/date";
import { Baby } from "@lib/types/baby";
import { BrowserWaiver, WaiverHeader } from "@lib/types/common";

import CheckboxText from "@components/molecules/CheckboxText";
import Button from "@components/atoms/Button";
import DatePicker from "@components/atoms/DatePicker";
import TextInput from "@components/atoms/TextInput";

import RightChevronIcon from "@components/Icons/RightChevronIcon";
import LockIcon from "@components/Icons/LockIcon";
import TitleTopBar from "@components/logos/TitleTopBar";
import { signWaiver } from "db/actions/caregiver/Waiver";

interface Props {
  books: { name: string; birthday: string; bookLink: string }[];
  mediaReleaseWaiver: BrowserWaiver | null;
  signedMediaRelease: boolean;
  caregiverId: string;
}

const mdRender = new MarkdownIt();

// TODO add topbar and merge designs

export default function BabyBookHome({
  books,
  mediaReleaseWaiver,
  signedMediaRelease,
  caregiverId,
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
  const [showForm, setShowForm] = useState(!signedMediaRelease && !notSigning);
  const router = useRouter();

  // First check if Media Release Form should be shown
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
      <div className="sm:w-full relative">
        {showModal && (
          <div
            className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-end sm:items-center sm:justify-center bg-primary-text/25"
            onClick={(e) => {
              // If click didn't originate in this element, ignore it
              if (e.target !== e.currentTarget) return;
              setShowModal(false);
            }}
          >
            <div className="bg-white w-full sm:max-w-[600px] sm:rounded p-6 sm:p-12 sm:text-center">
              <p className="self-start text-xl sm:text-2xl font-bold text-primary-text">
                Don&apos;t Share?
              </p>
              <p className="mt-2 sm:mt-4">
                Proceeding without agreeing to the Media Release Form restricts
                Motherood Beyond Bars from sharing any photos for media use.
              </p>
              <p className="mt-2 sm:mt-4 font-semibold">
                You can agree to this form at any time in the Resource Library.
              </p>
              <div className="flex gap-4 mt-4 sm:mt-8 sm:px-[10%]">
                <Button
                  text="Continue"
                  type="tertiary"
                  onClick={async () => {
                    const waiver: WaiverHeader = {
                      waiverName: MEDIA_RELEASE_WAIVER_NAME,
                      agreedToWaiver: false,
                      agreedDate: "",
                      agreedSignature: "",
                    };

                    const res = await signWaiver(caregiverId, waiver);

                    if (res.success) {
                      setShowModal(false);
                      setNotSigning(true);
                      setShowForm(false);

                      if (books.length === 1) {
                        router.push(books[0].bookLink);
                      }
                    }
                  }}
                />
                <Button
                  text="Agree to Form"
                  onClick={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        )}
        <TitleTopBar title="Baby Book" />
        <div className="p-4">
          <p className="self-start text-2xl sm:text-center font-bold text-primary-text sm:mt-8">
            Media Release Form
          </p>
          <div className="flex flex-col w-full items-center mt-4">
            <div className="flex flex-col items-center md:max-w-[800px] gap-2 sm:gap-4">
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
              <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 w-full">
                <TextInput
                  label="Signature"
                  error={form.formState.errors.signature?.message}
                  formValue={form.register("signature", {
                    validate: (v) => (!v ? "Signature cannot be empty" : true),
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
              <div className="w-full sm:w-auto">
                <Button
                  text="Next"
                  onClick={async () => {
                    const isValid = await form.trigger(undefined, {
                      shouldFocus: true,
                    });

                    if (!isValid) return;

                    const formValues = form.getValues();

                    const waiver: WaiverHeader = {
                      waiverName: MEDIA_RELEASE_WAIVER_NAME,
                      agreedToWaiver: true,
                      agreedDate: formValues.date.toISOString(),
                      agreedSignature: formValues.signature,
                    };

                    const res = await signWaiver(caregiverId, waiver);

                    if (res.success) {
                      setShowForm(false);

                      if (books.length === 1) {
                        router.push(books[0].bookLink);
                      }
                    }
                  }}
                />
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 mt-4 sm:mt-8 sm:px-16 text-base sm:text-base w-full sm:w-auto justify-center"
                >
                  Continue without signing Media Release
                  <RightChevronIcon color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Next check if there is only one child, if so the user should be routed to that page
  if (books.length === 1 && !showForm) {
    router.push(books[0].bookLink);
    return null;
  }

  // Check if the user is assigned any children
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

  // If the user has multiple children, they will have the option to select each child
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
        caregiverId: "",
      },
    };
  }

  const waivers = await getWaivers();
  const mediaReleaseWaiver = waivers.find(
    (w) => w.name === MEDIA_RELEASE_WAIVER_NAME
  );
  const signedMediaRelease =
    caregiver?.signedWaivers?.some(
      (w) => w.waiverName === MEDIA_RELEASE_WAIVER_NAME
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
      caregiverId: caregiver.id,
    },
  };
};
