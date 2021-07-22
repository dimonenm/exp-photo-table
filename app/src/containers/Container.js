import React from 'react';
import "./Container.css";

const Container = ({ children }) => (
    <div className="top-container">
        {children}
    </div>
);

export default Container;