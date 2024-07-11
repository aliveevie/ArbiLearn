import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import Image from 'next/image';
import logo from '../public/logo.svg'; // Make sure to replace 'public/logo.png' with the path to your logo image

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>
      <div className="flex items-center space-x-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};

export default Header;
