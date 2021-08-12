import React from 'react';
import "./MenuBtnsCloseBtn.css";

const MenuBtnsCloseBtn = () => {
    function clickHandler() {
        console.log('MenuBtnsCloseBtn')
    }
    return (
        <div className="close-btn" onClick={clickHandler}></div>
    )
}

export default MenuBtnsCloseBtn;