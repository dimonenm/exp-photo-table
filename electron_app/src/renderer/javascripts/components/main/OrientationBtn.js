import React from "react";
import GallaryImage from '../../entities/GalleryImage';

const OrientationBtn = ({ type, currentGalleryImage, setCurrentGalleryImage, galleryImages, setGalleryImages }) => {
    function dragover(event) {
        event.preventDefault();
        console.log('dragover');
    }

    function dragenter(event) {
        event.preventDefault();
        console.log('dragenter');
    }

    function dragleave(event) {
        event.preventDefault();
        console.log('dragleave');
    }

    function dragdrop(event) {
        event.preventDefault();
        console.log('dragdrop', event.target.dataset.type);
        const gallaryImage = new GallaryImage()
        gallaryImage.setName(currentGalleryImage.nameImg)
        gallaryImage.setUrl(currentGalleryImage.urlImg)
        const arr = [...galleryImages];
        gallaryImage.setIndex(arr.length + 1);

        if (event.target.dataset.type === 'panorama') {
            gallaryImage.setOrientation('panorama')
        }
        switch (event.target.dataset.type) {
            case 'panorama':
                gallaryImage.setOrientation('panorama')
                break;
            case 'horizontal':
                gallaryImage.setOrientation('horizontal')
                break;
            case 'vertical':
                gallaryImage.setOrientation('vertical')
                break;
            case '15X10':
                gallaryImage.setOrientation('15X10')
                break;
            case '10X15':
                gallaryImage.setOrientation('10X15')
                break;
            case '9X6':
                gallaryImage.setOrientation('9X6')
                break;
            case '6X9':
                gallaryImage.setOrientation('6X9')
                break;

            default:
                break;
        }
        arr.push(gallaryImage);
        console.log(arr);
        setGalleryImages(arr);
        setCurrentGalleryImage({ nameImg: null, urlImg: null, textImg: null });
    }






    if (type === 'panorama') {
        return (
            <div className="orientation-menu-btn"
                data-type="panorama"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-panorama-btn"
                    data-type="panorama">
                    Панорама
                </div>
            </div>
        )
    }
    if (type === '15x10') {
        return (
            <div className="orientation-menu-btn"
                data-type="15X10"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-horizontal-15x10-btn"
                    data-type="15X10">
                    15x10
                </div>
            </div>
        )
    }
    if (type === '10x15') {
        return (
            <div className="orientation-menu-btn"
                data-type="10X15"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-10x15-btn"
                    data-type="10X15">

                    10x15
                </div>
            </div>
        )
    }
    if (type === '12x9') {
        return (
            <div className="orientation-menu-btn"
                data-type="horizontal"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-horizontal-12x9-btn"
                    data-type="horizontal">
                    12x9
                </div>
            </div>
        )
    }
    if (type === '9x12') {
        return (
            <div className="orientation-menu-btn"
                data-type="vertical"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-9x12-btn"
                    data-type="vertical">

                    9x12
                </div>
            </div>
        )
    }
    if (type === '9x6') {
        return (
            <div className="orientation-menu-btn"
                data-type="9X6"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-horizontal-9x6-btn"
                    data-type="9X6">
                    9x6
                </div>
            </div>
        )
    }
    if (type === '6x9') {
        return (
            <div className="orientation-menu-btn"
                data-type="6X9"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-6x9-btn"
                    data-type="6X9">
                    6x9
                </div>
            </div>
        )
    }
    return null
}
export default OrientationBtn;