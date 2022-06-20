import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import GallaryImage from '../../entities/GalleryImage';

const LighteningBackground = () => {
    const localModalProperties = useContext(modalDataContext);
    let clickHandler;

    if (localModalProperties.modalProperties.isOpen &&
        localModalProperties.modalProperties.type === "editPhoto") {
        clickHandler = () => {
            localModalProperties.setModalProperties(() => {
                return {
                    isOpen: false,
                    type: null,
                    nameImg: null,
                    urlImg: null,
                    textImg: null,
                    indexImgInGallery: null
                }
            });
            localModalProperties.setGalleryImg(new GallaryImage());
        }
    } else {
        clickHandler = () => {
            localModalProperties.setModalProperties(() => {
                return {
                    isOpen: false,
                    type: null,
                    nameImg: null,
                    urlImg: null
                }
            });
        }
    }

    return <div className="lightening-background" onClick={clickHandler}></div>;
}

export default LighteningBackground;