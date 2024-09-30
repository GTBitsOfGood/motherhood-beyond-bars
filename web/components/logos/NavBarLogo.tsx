import Link from 'next/link';
import Image from 'next/image';
import navbar_logo from "../../public/navbar_logo.png";
import navbar_logo_bg from "../../public/navbar_logo_bg.png"

interface LogoProps {
  isAdmin: boolean;
  caregiverName?: string;
}

const Logo: React.FC<LogoProps> = ({ isAdmin, caregiverName }) => {
  const homeLink = isAdmin ? '/admin' : '/caregiver';
  
  return (
    <div>
        <Link href={homeLink}>
        <button>
            <span className="left-0 right-0 w-[318px] h-[81px]">
                <Image className="relative" src={navbar_logo_bg} />
            </span>
            <span className="absolute top-[26px] left-[33px]">
                <Image className="static px-10" src={navbar_logo} />
            </span>
            {
                isAdmin ? 
                    <span className="absolute top-[29px] left-[82px]">
                        <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
                            Admin Portal
                        </h1>
                    </span> :
                    <span className="absolute top-[22px] left-[90px] flex flex-col items-start">
                        <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
                            {caregiverName}
                        </h1>
                        <h1 className="text-sm font-normal inline-block whitespace-nowrap uppercase text-white">
                            Caregiver
                        </h1>
                    </span>
            }
        </button>
      {/* <button className="flex items-center justify-center p-2">
        <img src={isAdmin ? '/path/to/admin-logo.png' : '/path/to/caregiver-logo.png'} alt="Logo" />
      </button> */}
    </Link>
    </div>

  );
};

export default Logo;
