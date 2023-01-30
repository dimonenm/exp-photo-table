import React from "react";

const ModalCanvasTools = ({ galleryImg, contrastRangeChangeHandler, brightnessRangeChangeHandler, saturateRangeChangeHandler, zoomRangeChangeHandler, rotationDegreesRangeChangeHandler }) => {

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
                <div className='modal-canvas-tools-contrast-scale'>Вращение: {0} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="-180"
                        max="180"
                        value={galleryImg.getRotationDegrees()}
                        onChange={rotationDegreesRangeChangeHandler}
                    ></input>
                </div>
            </div>


        </>
    )
}
export default ModalCanvasTools