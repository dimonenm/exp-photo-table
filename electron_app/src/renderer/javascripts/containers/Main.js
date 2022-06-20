import React from 'react';

const Main = ({ children }) => (
    <div className="main-wrapper">
        <div className="main">
            {children}
        </div>
    </div>
);

export default Main;