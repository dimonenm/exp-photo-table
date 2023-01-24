import React from "react";

const ModalCanvasTools = (galleryImg,) => {
    function contrastRangeChangeHandler(event) {

        const newState = Object.assign(new GallaryImage(), { ...galleryImg, contrast: event.target.value });

        setGalleryImg((prev) => {
            return newState;
        })

        setToolState((prev) => {
            return {
                ...prev,
                type: 'hand',
                tool: new Hand(
                    canvasRef.current,
                    newState,
                    setGalleryImg,
                    isZoomScaleGrid)
            }
        });
    }



    return (
        <>
            <div className="modal-canvas-tools">
                <div className='modal-canvas-tools-title'>Инструменты:</div>
                <div className='modal-canvas-tools-contrast'>
                    <div className='modal-canvas-tools-contrast-scale'>Контраст: {galleryImg.getContrast()}%</div>
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
                </div>
            </div>

        </>
    )
}
export default ModalCanvasTools