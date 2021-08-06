import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import './LighteningBackground.css';

const LighteningBackground = () => {
    const localModalProperties = useContext(modalDataContext);

    function clickHandler() {
        localModalProperties.setModalProperties(() => {
            return {
                isOpen: false,
                type: null,
                nameImg: null,
                urlImg: null
            }
        });
    }

    return <div className="lightening-background" onClick={clickHandler}></div>;
}

export default LighteningBackground;