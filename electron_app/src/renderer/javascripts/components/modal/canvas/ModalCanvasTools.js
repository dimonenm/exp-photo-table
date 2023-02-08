import React from "react";
import GallaryImage from '../../../entities/GalleryImage';

const ModalCanvasTools = ({ galleryImg, setGalleryImg, contrastRangeChangeHandler, brightnessRangeChangeHandler, saturateRangeChangeHandler, zoomRangeChangeHandler }) => {

    function rotationDegreesRangeChangeHandler(event) {
        const newState = Object.assign(new GallaryImage(), { ...galleryImg });
        newState.setRotationDegrees(`${Number(newState.getRotationDegrees()) + (event.target.value - Number(newState.getRotationDegrees()))}`)
        setGalleryImg(() => newState)
    }
    function mouseWheelRotationHandler(event) {
        const newState = Object.assign(new GallaryImage(), { ...galleryImg })
        if (event.deltaY > 0) {
            newState.setRotationDegrees(`${Number(newState.getRotationDegrees()) + 5}`)
            if (Number(newState.getRotationDegrees()) > 180) newState.setRotationDegrees('180') 
        } else {
            newState.setRotationDegrees(`${Number(newState.getRotationDegrees()) - 5}`)
            if (Number(newState.getRotationDegrees()) < -180) newState.setRotationDegrees('-180') 
        }
        setGalleryImg(() => newState)
    }

    return (
        <>
            <div className="modal-canvas-tools">
                <div className='modal-canvas-tools-title'>Инструменты:</div>
                <div className='modal-canvas-tools-contrast-scale'>Контраст {galleryImg.getContrast()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        value={galleryImg.getContrast()}
                        onChange={contrastRangeChangeHandler}
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
                <div className='modal-canvas-tools-contrast-scale'>Вращение: {galleryImg.getRotationDegrees()} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="5"
                        min="-180"
                        max="180"
                        value={galleryImg.getRotationDegrees()}
                        onChange={rotationDegreesRangeChangeHandler}
                        onWheel={mouseWheelRotationHandler}
                    ></input>
                </div>
            </div>
        </>
    )
}
export default ModalCanvasTools