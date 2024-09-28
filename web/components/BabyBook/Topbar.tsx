import DownloadIcon from "@components/Icons/DownloadIcon";
import ImageIcon from "@components/Icons/ImageIcon";
import LinkIcon from "@components/Icons/LinkIcon";
import PersonIcon from "@components/Icons/PersonIcon";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { stringify } from "querystring";
import { useState } from "react";
import admin_portal_gradient from "../../public/admin_portal_gradient.png";
import left_heart from "../../public/left_heart.png";
import right_heart from "../../public/right_heart.png";
import Button from "@components/atoms/Button";

const TopBar = ({ number, motherName, name, content, iv }: Props) => {
  const [copiedConfirmation, setCopiedConfirmation] = useState(false);

  const downloadAlbum = async () => {
    const a = document.createElement("a");
    a.href = `/api/download-album?content=${content}&iv=${iv}`;
    console.log(a.href);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + window.location.pathname + window.location.search
    );
    setCopiedConfirmation(true);
    setTimeout(() => {
      setCopiedConfirmation(false);
    }, 2000);
  };

  return (
    <div className="flex justify-between w-full shadow-lg">
      <div className="flex items-center">
        <div className="flex items-center justify-center min-w-[164px] h-[81px] overflow-hidden bg-admin-baby-book-background">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
          >
            <path
              d="M20.6927 6.12111L15.3754 1H5.92491M5.92491 1L1 6.24913V18.6678M5.92491 1L12.4471 13.1626M1 18.6678L20.0341 38M1 18.6678L12.4471 13.1626M20.0341 38L40 17.8997V16.1073M20.0341 38L16.2406 25.5813M20.0341 38L31.6143 19.451M12.4471 13.1626L16.2406 25.5813M12.4471 13.1626L25.7577 1.79569M12.4471 13.1626L28.4303 14.5709M16.2406 25.5813L29.6177 20.2472M40 16.1073V6.63322L38.2696 4.96886M40 16.1073L31.6143 19.451M31.6143 19.451L29.6177 20.2472M29.6177 20.2472L28.8856 16.7474M25.7577 1.79569L26.6894 1H34.1433L38.2696 4.96886M25.7577 1.79569L28.4303 14.5709M28.8856 16.7474L38.2696 4.96886M28.8856 16.7474L28.4303 14.5709"
              stroke="white"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <p className="font-bold text-2xl text-center mx-4">
          {name}&apos;s album
        </p>
        <div className="flex items-center mx-3">
          <ImageIcon />
          <p className="text-dark-400 ml-1">{number} photos</p>
        </div>
        <div className="flex items-center mx-3">
          <PersonIcon />
          <p className="text-dark-400 ml-1">Mother - {motherName}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[18px] mr-6">
        <Button
          onClick={downloadAlbum}
          text="Download album"
          icon={<DownloadIcon />}
        />
        <Button onClick={downloadAlbum} text="Copy link" icon={<LinkIcon />} />
      </div>
    </div>
  );
};

interface Props {
  number: number;
  motherName: string;
  name: string;
  content: string;
  iv: string;
}

export default TopBar;
