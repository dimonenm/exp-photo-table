import React from 'react';
// import "./Main.css";

const Main = ({ children }) => (
    <div className="main-wrapper">
        <div className="main">
            {children}
        </div>
    </div>
);

export default Main;