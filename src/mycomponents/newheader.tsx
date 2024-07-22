import Image from 'next/image';
import logo from '../../public/logo.png'; // Make sure to replace 'public/logo.png' with the path to your logo image

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 w-full">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="flex items-center ml-auto">
        <w3m-button />
      </div>
    </header>
  );
};

export default Header;
