import React from "react";
import GallaryImage from "../../../entities/GalleryImage";
const ModalCanvasTools = ({ contrastRangeChangeHandler, brightnessRangeChangeHandler, saturateRangeChangeHandler, zoomRangeChangeHandler, galleryImg, setGalleryImg }) => {

    function contrastRangeChangeHandler(event) {
        const newState = Object.assign(new GallaryImage(), { ...galleryImg, contrast: event.target.value });

        setGalleryImg((prev) => {
            return newState;
        })
    }
    function mouseWheelHandlerForContrast(event) {
        // console.log(event.deltaY > 0);
        if (event.deltaY > 0) {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let contrastValue = newGalleryImg.getContrast()
            newGalleryImg.setContrast(`${+contrastValue + 5}`)
            console.log(galleryImg.getContrast());
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }
        else {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let contrastValue = newGalleryImg.getContrast()
            newGalleryImg.setContrast(`${+contrastValue - 5}`)
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }

    }
    function mouseWheelHandlerForBrightness(event) {
        if (event.deltaY > 0) {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let brightnessValue = newGalleryImg.getBrightness()
            newGalleryImg.setBrightness(`${+brightnessValue + 5}`)
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }
        else {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let brightnessValue = newGalleryImg.getBrightness()
            newGalleryImg.setBrightness(`${+brightnessValue - 5}`)
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }
    }
    function mouseWheelHandlerForSaturate(event) {
        if (event.deltaY > 0) {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let saturateValue = newGalleryImg.getSaturate()
            newGalleryImg.setSaturate(`${+saturateValue + 5}`)
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }
        else {
            const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
            let saturateValue = newGalleryImg.getSaturate()
            newGalleryImg.setSaturate(`${+saturateValue - 5}`)
            setGalleryImg((prev) => {
                return newGalleryImg;
            })
        }
    }

    return (
        <>
            <div className="modal-canvas-tools">
                <div className='modal-canvas-tools-title'>Инструменты:</div>
                <div className='modal-canvas-tools-contrast-scale'>Контраст {galleryImg.getContrast()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="5"
                        min="0"
                        max="200"
                        value={galleryImg.getContrast()}
                        onChange={contrastRangeChangeHandler}
                        onWheel={mouseWheelHandlerForContrast}
                    ></input>
                </div>
                <div className='modal-canvas-tools-contrast-scale'>Яркость: {galleryImg.getBrightness()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        value={galleryImg.getBrightness()}
                        onChange={brightnessRangeChangeHandler}
                        onWheel={mouseWheelHandlerForBrightness}
                    ></input>
                </div>
                <div className='modal-canvas-tools-contrast-scale'>Насыщенность: {galleryImg.getSaturate()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        value={galleryImg.getSaturate()}
                        onChange={saturateRangeChangeHandler}
                        onWheel={mouseWheelHandlerForSaturate}
                    ></input>
                </div>
                <div className='modal-canvas-tools-contrast-scale'>Увеличение: {galleryImg.getZoom()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="10"
                        min="100"
                        max="400"
                        value={galleryImg.getZoom()}
                        onChange={zoomRangeChangeHandler}
                    ></input>
                </div>
            </div>


        </>
    )
}
export default ModalCanvasTools