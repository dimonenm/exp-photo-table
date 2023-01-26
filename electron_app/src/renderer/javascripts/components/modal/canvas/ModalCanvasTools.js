import React from "react";

const ModalCanvasTools = ({ contrastRangeChangeHandler, zoomRangeChangeHandler, contrastValue, galleryImg }) => {




    return (
        <>
            <div className="modal-canvas-tools">
                <div className='modal-canvas-tools-title'>Инструменты:</div>
                <div className='modal-canvas-tools-contrast-scale'>Контраст: {contrastValue} %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        value={contrastValue}
                        onChange={contrastRangeChangeHandler}
                    ></input>
                </div>
                <div className='modal-canvas-tools-contrast-scale'>Яркость: %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        onChange={contrastRangeChangeHandler}
                    ></input>
                </div>
                <div className='modal-canvas-tools-contrast-scale'>Насыщенность: %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
                        onChange={contrastRangeChangeHandler}
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