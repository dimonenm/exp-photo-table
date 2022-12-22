import React from "react";


function ImageViewerFor6X9({ img1, img2, setModalProperties }) {

    const firstImgDbClickHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: img1.getIndex()
                }
            );
        }
        )
    }
    const secondImgDbClickHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: img2.getIndex()
                }
            );
        }
        )
    }

    return (
        <>
            <div className='image-viewer-wrapper-6X9'>
                <div className='image-viewer-6X9'>
                    <img className='image-viewer-photo-6X9'
                        onDoubleClick={firstImgDbClickHandler}
                        src={img1.getUrl()}
                    ></img>
                    <div className='image-viewer-photo-6X9-description'>
                        <span>{`Фото № ${img1.getIndex()}. `} </span>{img1.getImgDesc()}
                    </div>
                </div>
                <div className='image-viewer-6X9'>
                    <img className='image-viewer-photo-6X9'
                        onDoubleClick={secondImgDbClickHandler}
                        src={img2.getUrl()}
                    ></img>
                    <div className='image-viewer-photo-6X9-description'>
                        <span>{`Фото № ${img2.getIndex()}. `} </span>{img2.getImgDesc()}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ImageViewerFor6X9