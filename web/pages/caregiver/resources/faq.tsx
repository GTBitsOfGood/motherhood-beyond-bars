import { useRouter } from "next/router";
import { useState } from "react";

import BackButton from "@components/atoms/BackButton";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import TitleTopBar from "@components/logos/TitleTopBar";

export default function FAQ() {
  // TODO dynamically generate data from database
  const [data, setData] = useState([
    {
      question: "How can Motherhood Beyond Bars help?",
      answer:
        "We recognize that every situation is unique and that there is no one-size-fits-all solution. If you have a question, we can help point you in the right direction. We provide various services to support you and your family during this difficult time. From the moment you reach out to us, we offer assistance and guidance to help you navigate our services and settle in. Whether you have questions, concerns, or need support, we're here for you.",
    },
    {
      question:
        "Does Motherhood Beyond Bars aid with legal matters and social services?",
      answer:
        "Yes, we do. Motherhood Beyond Bars can provide you with guidance and support regarding legal matters and social services. We understand that navigating the questions regarding guardianship and paperwork can be overwhelming. Our team will assist you in understanding and completing the necessary legal processes to ensure you can safely care for the baby. Additionally, we can help you apply for social services such as WIC, which can help alleviate the cost of infant formula. We'll handle the application process over the phone and provide updates and renewals as needed.",
    },
    {
      question:
        "How does Motherhood Beyond Bars help maintain communication between incarcerated mothers and their infants?",
      answer:
        "We believe in maintaining the mother-infant bond, even when separated due to incarceration. Motherhood Beyond Bars assist in facilitating communication between incarcerated mothers and their infants. We help by sending in pictures and subsidizing email and phone communication so that moms can hear their babies and babies can hear their mother's voices. We ensure that cost never stands in the way of this vital connection.",
    },
  ]);

  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <TitleTopBar title="Resources" />
      <div className="ml-10 my-6 flex">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="text-2xl font-bold mb-6 m-6 sm:ml-[5.5rem] sm:mt-0">
          FAQ
        </div>
        <div className="flex flex-col justify-center items-center">
          {data.map((faq, i) => {
            return (
              <QuestionAnswer
                title={faq["question"]}
                description={faq["answer"]}
                showDesc={false}
              ></QuestionAnswer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
