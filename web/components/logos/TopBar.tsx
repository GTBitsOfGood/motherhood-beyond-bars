import Image from 'next/image';
import topbar_logo from "../../public/topbar_logo.png";

interface TopBarProps {
    title: string;
    onNavToggle: () => void;
}
  
const TopBar: React.FC<TopBarProps> = ({ title, onNavToggle }) => {
    return (
      <div className="bg-pink-600 text-white flex justify-between items-center p-4 z-40">
        <button onClick={onNavToggle} className="text-white focus:outline-none lg:hidden">
            <Image className="static px-10" src={topbar_logo} />
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">{title}</h1>
      </div>
    );
  };
  
export default TopBar;