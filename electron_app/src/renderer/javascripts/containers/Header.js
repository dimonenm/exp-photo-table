import React from 'react';
// import "./Header.css";

const Header = ({ children }) => (
    <div className="header-wrapper">
        <div className="header-tools"></div>
        <div className="header">
            {children}
        </div>
    </div>
);

export default Header;