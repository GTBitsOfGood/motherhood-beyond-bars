import Button from "@components/atoms/Button";
import LockIcon from "@components/Icons/LockIcon";
import { GetServerSideProps } from "next";

interface Props {
  babies: any[];
  books: { name: string; birthday: string; bookLink: string }[];
}

export default function BabyBookHome({ babies, books }: Props) {
  if (babies.length === 0) {
    return (
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
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col my-[3.75rem] mx-auto px-[3.5rem] items-center gap-[1.75rem] max-w-[530px]">
        <p className="self-start text-2lg sm:text-3xl font-bold text-primary-text">
          Start a Baby Book
        </p>
        <p className="sm:text-xl">
          The Baby Book is a place where you can document the baby&#39;s journey
          by uploading images and descriptions. Motherhood Behind Bars will then
          deliver the images to the mothers, so they can stay updated on their
          baby&#39;s growth.
        </p>
        <Button text="Get Started" />
      </div>
    );
  }

  return (
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
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  // TODO: implement actual book fetching here
  return {
    props: {
      babies: [""],
      books: [
        {
          name: "John",
          birthday: "11/13/2204",
          bookLink:
            "/caregiver/book/bd89888ca382e490a04183167a810518f2aa9f39?iv=af3abe9304c706f681857b64fc4e6127",
        },
        {
          name: "Joe",
          birthday: "11/13/2104",
          bookLink: "/link/link2",
        },
        {
          name: "Joslyn",
          birthday: "11/13/2004",
          bookLink: "/link/link3",
        },
      ],
    },
  };
};
