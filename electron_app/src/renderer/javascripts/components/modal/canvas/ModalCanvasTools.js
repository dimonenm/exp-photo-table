import React from "react";
import GallaryImage from '../../../entities/GalleryImage';

const ModalCanvasTools = ({ galleryImg, setGalleryImg, toolState }) => {

  function rotationDegreesRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg });
    newState.setRotationDegrees(`${Number(newState.getRotationDegrees()) + (event.target.value - Number(newState.getRotationDegrees()))}`)
    setGalleryImg(() => newState)
  }
  function contrastRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, contrast: event.target.value });

    toolState.tool.updateGalleryImg(newState)

    setGalleryImg(() => { newState })
  }
  function brightnessRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, brightness: event.target.value });

    toolState.tool.updateGalleryImg(newState)

    setGalleryImg(() => { newState })
  }
  function saturateRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, saturate: event.target.value });

    toolState.tool.updateGalleryImg(newState)

    setGalleryImg(() => { newState })
  }
  function zoomRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, zoom: event.target.value });
    
    toolState.tool.updateGalleryImg(newState)

    setGalleryImg(() => { newState })
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

    toolState.tool.updateGalleryImg(newState)

    setGalleryImg(() => newState)
  }
  function mouseWheelContrastHandler(event) {
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let contrastValue = newGalleryImg.getContrast()
      newGalleryImg.setContrast(`${+contrastValue + 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }
    else {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let contrastValue = newGalleryImg.getContrast()
      newGalleryImg.setContrast(`${+contrastValue - 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }

  }
  function mouseWheelBrightnessHandler(event) {
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let brightnessValue = newGalleryImg.getBrightness()
      newGalleryImg.setBrightness(`${+brightnessValue + 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }
    else {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let brightnessValue = newGalleryImg.getBrightness()
      newGalleryImg.setBrightness(`${+brightnessValue - 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }
  }
  function mouseWheelSaturateHandler(event) {
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let saturateValue = newGalleryImg.getSaturate()
      newGalleryImg.setSaturate(`${+saturateValue + 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }
    else {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let saturateValue = newGalleryImg.getSaturate()
      newGalleryImg.setSaturate(`${+saturateValue - 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
    }
  }
  function mouseWheelZoomHandler(event) {
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let zoomValue = newGalleryImg.getZoom()
      newGalleryImg.setZoom(`${+zoomValue + 5}`)
      setGalleryImg(() => {
        return newGalleryImg;
      });
    }
    if (event.deltaY < 0 && galleryImg.getZoom() !== '100') {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let zoomValue = newGalleryImg.getZoom()
      newGalleryImg.setZoom(`${+zoomValue - 5}`)
      setGalleryImg((prev) => {
        return newGalleryImg;
      });
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
            onWheel={mouseWheelContrastHandler}
          ></input>
        </div>
        <div className='modal-canvas-tools-contrast-scale'>Яркость: {galleryImg.getBrightness()} %</div>
        <div className='modal-canvas-tools-contrast-range'>
          <input
            type="range"
            step="5"
            min="0"
            max="200"
            value={galleryImg.getBrightness()}
            onChange={brightnessRangeChangeHandler}
            onWheel={mouseWheelBrightnessHandler}
          ></input>
        </div>
        <div className='modal-canvas-tools-contrast-scale'>Насыщенность: {galleryImg.getSaturate()} %</div>
        <div className='modal-canvas-tools-contrast-range'>
          <input
            type="range"
            step="5"
            min="0"
            max="200"
            value={galleryImg.getSaturate()}
            onChange={saturateRangeChangeHandler}
            onWheel={mouseWheelSaturateHandler}
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
            onWheel={mouseWheelZoomHandler}
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