import DownloadIcon from "@components/Icons/DownloadIcon";
import ImageIcon from "@components/Icons/ImageIcon";
import LinkIcon from "@components/Icons/LinkIcon";
import PersonIcon from "@components/Icons/PersonIcon";
import { useState } from "react";
import Button from "@components/atoms/Button";
import Image from "next/image";

const TopBar = ({
  number,
  motherName,
  name,
  content,
  iv,
  isPictureSelected,
}: Props) => {
  const [copiedConfirmation, setCopiedConfirmation] = useState(false);

  const downloadAlbum = () => {
    const a = document.createElement("a");
    a.href = `/api/download-album?content=${content}&iv=${iv}`;
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
          <Image
            src="/MBBLogo.svg"
            alt="Motherhood Beyond Bars Logo"
            height={40}
            width={41}
          />
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
      {!isPictureSelected && (
        <div className="flex items-center gap-[1.125rem] mr-6">
          <Button
            onClick={downloadAlbum}
            text="Download album"
            icon={<DownloadIcon />}
            width="auto"
          />
          <Button
            onClick={copyLink}
            text="Copy link"
            icon={<LinkIcon />}
            width="auto"
          />
        </div>
      )}
    </div>
  );
};

interface Props {
  number: number;
  motherName: string;
  name: string;
  content: string;
  iv: string;
  isPictureSelected: boolean;
}

export default TopBar;
