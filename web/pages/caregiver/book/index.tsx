import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { encrypt } from "@lib/utils/encryption";
import { Baby } from "@lib/types/baby";

import TitleTopBar from "@components/logos/TitleTopBar";
import Button from "@components/atoms/Button";
import LockIcon from "@components/Icons/LockIcon";
import { Timestamp } from "@firebase/firestore";
import { numberFormatDate } from "@lib/utils/date";

interface Props {
  books: { name: string; birthday: string; bookLink: string }[];
}

// TODO add topbar and merge designs

export default function BabyBookHome({ books }: Props) {
  const router = useRouter();

  // TODO skip index screen if only one baby
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const caregiver = await getCurrentCaregiver(context);

  if (!caregiver) {
    return { props: { books: [] } };
  }

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
      books: books,
    },
  };
};
