import Link from 'next/link';
import Image from 'next/image';
import navbar_logo from "../../public/navbar_logo.svg";
import navbar_logo_bg from "../../public/navbar_logo_bg.png"

interface LogoProps {
  isAdmin: boolean;
  caregiverName?: string;
}

const Logo: React.FC<LogoProps> = ({ isAdmin, caregiverName }) => {
  const homeLink = isAdmin ? '/admin' : '/caregiver';

  return (
    // use custom gradient for admin navbar background, use mbb pink for caregiver navbar background
    <div className={`w-full h-full flex justify-between items-center p-4 ${isAdmin ? 'bg-navbar-background' : 'bg-mbb-pink'}`}>
        <Link href={homeLink} passHref>
            <button
                className="w-full h-full"
                onClick={(e) => {
                    // If already at home page, do not refresh, otherwise there's error "attempted to hard navigate to same URL"
                    if (window.location.pathname === homeLink) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="flex flex-row items-center">
                    <span>
                        <Image className="static px-10" src={navbar_logo} />
                    </span>
                    {
                        isAdmin ? 
                            <span className="px-[18px]">
                                <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
                                    Admin Portal
                                </h1>
                            </span> :
                            <span className="flex flex-col items-start px-[10px]">
                                <h1 className="text-md font-bold inline-block whitespace-nowrap uppercase text-white">
                                    {caregiverName}
                                </h1>
                                <h1 className="text-sm font-normal inline-block whitespace-nowrap uppercase text-white">
                                    Caregiver
                                </h1>
                            </span>
                    }
                </div>
            </button>
        </Link>
    </div>

  );
};

export default Logo;
