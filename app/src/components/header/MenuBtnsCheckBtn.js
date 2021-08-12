import React from 'react';
import "./MenuBtnsCheckBtn.css";

const MenuBtnsCheckBtn = () => {
    function clickHandler() {
        console.log('MenuBtnsCheckBtn')
    }
    return (
        <div className="check-btn" onClick={clickHandler}></div>
    )
}

export default MenuBtnsCheckBtn;