import React from "react";
import GallaryImage from '../../../entities/GalleryImage';

const ModalCanvasTools = ({ galleryImg, setGalleryImg, toolState }) => {

  function rotationDegreesRangeChangeHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg });
    newGalleryImg.setRotationDegrees(`${Number(newGalleryImg.getRotationDegrees()) + (event.target.value - Number(newGalleryImg.getRotationDegrees()))}`)
    setGalleryImg(() => newGalleryImg)
  }
  function contrastRangeChangeHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg, contrast: event.target.value });

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function brightnessRangeChangeHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg, brightness: event.target.value });

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function saturateRangeChangeHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg, saturate: event.target.value });

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function zoomRangeChangeHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg, zoom: event.target.value });
    
    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function mouseWheelRotationHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
    if (event.deltaY > 0) {
      newGalleryImg.setRotationDegrees(`${Number(newGalleryImg.getRotationDegrees()) + 5}`)
      if (Number(newGalleryImg.getRotationDegrees()) > 180) newGalleryImg.setRotationDegrees('180')
    } else {
      newGalleryImg.setRotationDegrees(`${Number(newGalleryImg.getRotationDegrees()) - 5}`)
      if (Number(newGalleryImg.getRotationDegrees()) < -180) newGalleryImg.setRotationDegrees('-180')
    }

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function mouseWheelContrastHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })

    if (event.deltaY > 0) {
      newGalleryImg.setContrast(`${Number(newGalleryImg.getContrast()) + 5}`)
      if (Number(newGalleryImg.getContrast()) > 200) newGalleryImg.setContrast('200')
      
    } else {
      newGalleryImg.setContrast(`${Number(newGalleryImg.getContrast()) - 5}`)
      if (Number(newGalleryImg.getContrast()) <= 0) newGalleryImg.setContrast('0')
    }

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function mouseWheelBrightnessHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })

    if (event.deltaY > 0) {
      newGalleryImg.setBrightness(`${Number(newGalleryImg.getBrightness()) + 5}`)
      if (Number(newGalleryImg.getBrightness()) > 200) newGalleryImg.setBrightness('200')

    } else {
      newGalleryImg.setBrightness(`${Number(newGalleryImg.getBrightness()) - 5}`)
      if (Number(newGalleryImg.getBrightness()) <= 0) newGalleryImg.setBrightness('0')
    }

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function mouseWheelSaturateHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })

    if (event.deltaY > 0) {
      newGalleryImg.setSaturate(`${Number(newGalleryImg.getSaturate()) + 5}`)
      if (Number(newGalleryImg.getSaturate()) > 200) newGalleryImg.setSaturate('200')

    } else {
      newGalleryImg.setSaturate(`${Number(newGalleryImg.getSaturate()) - 5}`)
      if (Number(newGalleryImg.getSaturate()) <= 0) newGalleryImg.setSaturate('0')
    }

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)
  }
  function mouseWheelZoomHandler(event) {
    const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })

    if (event.deltaY > 0) {
      newGalleryImg.setZoom(`${Number(newGalleryImg.getZoom()) + 5}`)
      if (Number(newGalleryImg.getZoom()) > 400) newGalleryImg.setZoom('400')

    } else {
      newGalleryImg.setZoom(`${Number(newGalleryImg.getZoom()) - 5}`)
      if (Number(newGalleryImg.getZoom()) <= 100) newGalleryImg.setZoom('100')
    }

    toolState.tool.updateGalleryImg(newGalleryImg)

    setGalleryImg(() => newGalleryImg)

    // if (event.deltaY > 0) {
    //   const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
    //   let zoomValue = newGalleryImg.getZoom()
    //   newGalleryImg.setZoom(`${+zoomValue + 5}`)
    //   setGalleryImg(() => {
    //     return newGalleryImg;
    //   });
    // }
    // if (event.deltaY < 0 && galleryImg.getZoom() !== '100') {
    //   const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
    //   let zoomValue = newGalleryImg.getZoom()
    //   newGalleryImg.setZoom(`${+zoomValue - 5}`)
    //   setGalleryImg((prev) => {
    //     return newGalleryImg;
    //   });
    // }
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