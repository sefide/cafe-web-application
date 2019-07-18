import React from 'react';
import MobileHeader from './MobileHeader';
import PcHeader from './PcHeader';
import SignInPopup from './SignInPopup';

const Header = () => {
  const dummyUser = { id: 'hyunjae' };
  const isLogined = false;
  const isAdmin = false;
  return (
    <>
      <MobileHeader isLogined={isLogined} isAdmin={isAdmin} user={dummyUser} />
      <PcHeader isLogined={isLogined} isAdmin={isAdmin} user={dummyUser} />
      <div className="signInContainer">
        <SignInPopup />
      </div>
    </>
  );
};
export default Header;
