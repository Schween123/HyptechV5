import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Img } from "./..";
import CashOutPopup from '../CashOutPopup/CashOutPopup';
import MenuIcon from '../MenuIcon/MenuIcon';
import Sidebar from '../Sidebar/Sidebar';

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false); // Close the sidebar when an item is clicked
  };

  return (
    <>
      <header {...props} className={`${props.className} flex flex-col gap-2.5`}>
        <div className="flex items-center justify-between gap-5 self-stretch h-[90px] pl-[30px]">
          <Img
            src="public/images/logo.png"
            alt="logo"
            className="h-[110px] w-[110px] object-cover "
          />
          <MenuIcon toggleMenu={toggleMenu} />
          <ul className="hidden md:flex flex-wrap items-center gap-[50px] justify-end w-full pr-[50px]">
            <li>
              <a href="#" onClick={openPopup}>
                <Text as="p" className="!font-opensans !text-cyan-800 !text-[25px]">
                  Cash Out
                </Text>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation('/roominfo')}>
                <Text as="p" className="!font-opensans !text-cyan-800 !text-[25px]">
                  Rooms
                </Text>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation('/reportsummary')}>
                <Text as="p" className="text-center !font-opensans !text-cyan-800 !text-[25px]">
                  Report Summary
                </Text>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation('/boarderregistration')}>
                <Text as="p" className="text-center !font-opensans !text-cyan-800 !text-[25px]">
                  New Boarder
                </Text>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation('/optionpage')}>
                <Text as="p" className="!font-opensans !text-cyan-800 !text-[25px]">
                  Log Out
                </Text>
              </a>
            </li>
          </ul>
        </div>
        <div className="h-[2px] w-11/12 mx-auto bg-cyan-800 shadow-xs" />
      </header>
      <Sidebar isOpen={isMenuOpen} togglePopup={openPopup} handleNavigation={handleNavigation} />
      <CashOutPopup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
}
