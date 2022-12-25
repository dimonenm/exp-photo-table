import React from "react";
import GallaryImage from '../../entities/GalleryImage';


function ImageViewerFor6X9({ img1, img2, galleryImages, setGalleryImages, setModalProperties, currentGalleryImage, setCurrentGalleryImage }) {

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

    const dragStartFirstImgHandler = (event) => {
        setCurrentGalleryImage({ index: img1.getIndex(), nameImg: img1.getName(), urlImg: img1.getUrl(), textImg: null });
    }
    const dragStartSecondImgHandler = (event) => {
        setCurrentGalleryImage({ index: img2.getIndex(), nameImg: img2.getName(), urlImg: img2.getUrl(), textImg: null });
    }

    const dragEndHandler = (event) => {
        setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
    }

    function dragover(event) {
        event.preventDefault();
    }

    function dragenter(event) {
        event.preventDefault();
    }

    function dragleave(event) {
        event.preventDefault();
    }
    function dragdropFirstImg(event) {
        event.preventDefault();

        const gallaryImage = new GallaryImage()
        gallaryImage.setName(currentGalleryImage.nameImg)
        gallaryImage.setUrl(currentGalleryImage.urlImg)
        const arr = [...galleryImages];
        const index = arr.findIndex(item => {
            if (item.getIndex() === img1.getIndex()) return true
            return false
        })

        arr.splice(index, 0, gallaryImage)

        arr.forEach((item, index) => {
            item.setIndex(index + 1)
        })

        setGalleryImages(arr);

        setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
    }
    function dragdropSecondImg(event) {
        event.preventDefault();

        const gallaryImage = new GallaryImage()
        gallaryImage.setName(currentGalleryImage.nameImg)
        gallaryImage.setUrl(currentGalleryImage.urlImg)
        const arr = [...galleryImages];
        const index = arr.findIndex(item => {
            if (item.getIndex() === img2.getIndex()) return true
            return false
        })

        arr.splice(index, 0, gallaryImage)

        arr.forEach((item, index) => {
            item.setIndex(index + 1)
        })

        setGalleryImages(arr);

        setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
    }

    return (
        <>
            <div className='image-viewer-wrapper-6X9'>
                <div className='image-viewer-6X9'>
                    <img
                        className='image-viewer-photo-6X9'
                        src={img1.getUrl()}

                        onDoubleClick={firstImgDbClickHandler}
                        
                        onDragStart={dragStartFirstImgHandler}
                        onDragEnd={dragEndHandler}

                        onDragOver={dragover}
                        onDragEnter={dragenter}
                        onDragLeave={dragleave}
                        onDrop={dragdropFirstImg}

                        draggable="true"
                    ></img>
                    <div className='image-viewer-photo-6X9-description'>
                        <span>{`Фото № ${img1.getIndex()}. `} </span>{img1.getImgDesc()}
                    </div>
                </div>
                <div className='image-viewer-6X9'>
                    <img
                        className='image-viewer-photo-6X9'
                        src={img2.getUrl()}
                        
                        onDoubleClick={secondImgDbClickHandler}
                        
                        onDragStart={dragStartSecondImgHandler}
                        onDragEnd={dragEndHandler}

                        onDragOver={dragover}
                        onDragEnter={dragenter}
                        onDragLeave={dragleave}
                        onDrop={dragdropSecondImg}

                        draggable="true"
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