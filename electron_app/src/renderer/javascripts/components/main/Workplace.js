import React from 'react';
import { useState } from 'react';

const Workplace = ({ children, workPlaceStyle }) => {
  
   
    return (

        <div className="workplace" style={workPlaceStyle}>
            {children}
        </div>
    );
}

export default Workplace;