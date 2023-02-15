import React from "react";
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="logo"
        src={headerLogo}
        alt="Логотип сервиса Mesto" />
    </header>
  );
}

export default Header;