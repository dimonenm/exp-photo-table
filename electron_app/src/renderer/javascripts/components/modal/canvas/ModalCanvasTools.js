import React from "react";

const ModalCanvasTools = ({ zoomRangeChangeHandler, galleryImg }) => {
    function contrastRangeChangeHandler(event) {

        console.log(event.target.value);
    }
  


    return (
        <>
            <div className="modal-canvas-tools">
                <div className='modal-canvas-tools-title'>Инструменты:</div>
                <div className='modal-canvas-tools-contrast-scale'>Контраст: %</div>
                <div className='modal-canvas-tools-contrast-range'>
                    <input
                        type="range"
                        step="1"
                        min="0"
                        max="200"
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