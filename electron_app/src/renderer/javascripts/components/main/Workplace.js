import React from 'react';
import { useState } from 'react';

const Workplace = ({ children, workPlaceStyle, setWorkPlaceStyle }) => {
  
   
    return (

        <div className="workplace" style={workPlaceStyle}>
            {children}
        </div>
    );
}

export default Workplace;