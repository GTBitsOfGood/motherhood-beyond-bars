import { GetServerSideProps } from "next";

export default function BabyBook({ babyId }: Props) {
  return <div>{babyId}</div>;
}

interface Props {
  babyId?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  return {
    props: {
      babyId: params?.babyId as string,
    },
  };
};
