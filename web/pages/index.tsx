import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "../components/";

interface Props {
  data: string;
}

const Home: NextPage<Props> = ({ data }: Props) => {
  return (
    <div className="bg-red-200 p-10">
      <Card text={data} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      data: "Hello, World!",
    },
  };
};

export default Home;
