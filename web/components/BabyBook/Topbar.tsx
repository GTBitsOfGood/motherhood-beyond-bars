import DownloadIcon from '@components/Icons/DownloadIcon';
import ImageIcon from '@components/Icons/ImageIcon';
import LinkIcon from '@components/Icons/LinkIcon';
import PersonIcon from '@components/Icons/PersonIcon';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { stringify } from 'querystring';
import { useState } from 'react';
import admin_portal_gradient from '../../public/admin_portal_gradient.png';
import left_heart from '../../public/left_heart.png';
import right_heart from '../../public/right_heart.png';

const TopBar = ({ number, motherName, name, content, iv }: Props) => {
  const [copiedConfirmation, setCopiedConfirmation] = useState(false);

  const downloadAlbum = async () => {
    const a = document.createElement('a');
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
    <div className='flex justify-between w-full shadow-lg'>
      <div className='flex items-center'>
        <div className='w-[164px] h-[81px] overflow-hidden'>
          <div className='relative right-12'>
            <Image
              className='relative'
              layout='fixed'
              src={admin_portal_gradient}
            />
          </div>
        </div>
        <span className='absolute top-[26px] left-[67px]'>
          <Image className='static px-10' src={left_heart} />
        </span>
        <span className='absolute top-[26px] left-[83px]'>
          <Image className='static px-10' src={right_heart} />
        </span>
        <p className='font-bold text-2xl text-center mx-4'>{name}'s album</p>
        <div className='flex items-center mx-3'>
          <ImageIcon />
          <p className='text-dark-400 ml-1'>{number} photos</p>
        </div>
        <div className='flex items-center mx-3'>
          <PersonIcon />
          <p className='text-dark-400 ml-1'>Mother - {motherName}</p>
        </div>
      </div>
      <div className='flex items-center font-semibold text-highlight'>
        <button
          className='rounded px-4 py-2 border border-highlight mx-2 flex items-center cursor-pointer'
          onClick={downloadAlbum}
        >
          <DownloadIcon />
          <p className='ml-2'>Download album</p>
        </button>
        <button
          className='rounded px-4 py-2 border border-highlight mx-2 flex items-center cursor-pointer'
          onClick={copyLink}
        >
          <LinkIcon />
          <p className='ml-2'>
            {copiedConfirmation ? 'Copied!' : 'Copy album link'}
          </p>
        </button>
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
