import React from "react";
import GallaryImage from '../../../entities/GalleryImage';

const ModalCanvasTools = ({ galleryImg, setGalleryImg, contrastValue, setContrastValue }) => {

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
  function contrastRangeChangeHandler(event) {
    // const newState = Object.assign(new GallaryImage(), { ...galleryImg, contrast: event.target.value });
    setContrastValue(event.target.value)
    // setGalleryImg((prev) => {
    //   return newState;
    // })
  }
  function brightnessRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, brightness: event.target.value });

    setGalleryImg((prev) => {
      return newState;
    });
  }
  function saturateRangeChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, saturate: event.target.value });

    setGalleryImg((prev) => {
      return newState;
    })
  }
  function zoomRangeChangeHandler(event) {

    const newState = Object.assign(new GallaryImage(), { ...galleryImg, zoom: event.target.value });

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
  function mouseWheelHandlerForContrast(event) {
    // console.log(event.deltaY > 0);
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let contrastValue = newGalleryImg.getContrast()
      newGalleryImg.setContrast(`${+contrastValue + 5}`)
      console.log(galleryImg.getContrast());
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
  function mouseWheelHandlerForBrightness(event) {
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
  function mouseWheelHandlerForSaturate(event) {
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
  function mouseWheelHandlerForZoom(event) {
    if (event.deltaY > 0) {
      const newGalleryImg = Object.assign(new GallaryImage(), { ...galleryImg })
      let zoomValue = newGalleryImg.getZoom()
      newGalleryImg.setZoom(`${+zoomValue + 5}`)
      setGalleryImg((prev) => {
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
            value={contrastValue ? contrastValue : galleryImg.getContrast()}
            onChange={contrastRangeChangeHandler}
            onWheel={mouseWheelHandlerForContrast}
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
            onWheel={mouseWheelHandlerForBrightness}
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
            onWheel={mouseWheelHandlerForZoom}
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