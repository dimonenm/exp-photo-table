import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';
import { renderImgInCanvas } from '../../../services/forModalCanvas/renderFunctions'
import { renderScaleGridInCanvas } from '../../../services/forModalCanvas/renderFunctions'
import { cutImgInGallery } from '../../../services/forModalCanvas/cuttingFunctions'
import GallaryImage from '../../../entities/GalleryImage';
import ModalCanvasTools from './ModalCanvasTools';
import Arrow_entity from '../../../entities/Arrow_entity';
const ModalCanvas = ({ imgDescState, setImgDescState, arrowDescState, setArrowDescState }) => {
  // const [contrastValue, setContrastValue] = useState('100')
  const [canvasToolState, setCanvasToolState] = useState({
    contrast: '100',
    brightness: '100',
    saturate: '100'
  })


  const localModalProperties = useContext(modalDataContext);

  const galleryImg = localModalProperties.galleryImg;
  const setGalleryImg = localModalProperties.setGalleryImg;
  const galleryImages = localModalProperties.galleryImages;
  const indexImgInGallery = localModalProperties.modalProperties.indexImgInGallery;
  const [toolState, setToolState] = useState({ type: 'hand', tool: null });
  let canvasSize = { width: 0, height: 0 };
  const [isZoomScaleGrid, setIsZoomScaleGrid] = useState(false);
  const canvasRef = useRef();
  const scaleGridCanvasRef = useRef();
  let canvasStyle = {
    filter: `contrast(${canvasToolState.contrast}%)
    brightness(${canvasToolState.brightness}%)
    saturate(${canvasToolState.saturate}%)`
  }

  function handClickHandler(event) {
    if (toolState.type === 'hand') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            galleryImg,
            setGalleryImg,
            isZoomScaleGrid,
            scaleGridCanvasRef)
        }
      });
    };
  }
  function arrowClickHandler(event) {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      } else {
        setToolState((prev) => {
          return {
            ...prev,
            type: 'arrow',
            tool: new Arrow(
              canvasRef.current,
              galleryImg,
              setGalleryImg)
          }
        });
      }
    };
  }
  function arrowtextDescClickHandler(event) {
    if (toolState.type === 'arrowTextDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      }
      setToolState((prev) => {
        return {
          ...prev,
          type: 'arrowTextDesc',
          tool: new HandFree(canvasRef.current)
        }
      });
    };
  }
  function imgDescClickHandler() {
    if (toolState.type === 'imgDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      }
      setToolState((prev) => {
        return {
          ...prev,
          type: 'imgDesc',
          tool: new HandFree(canvasRef.current)
        }
      });
    };
  }
  async function orientationPanoramaClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'panorama', lastOffsetValueX: 0 })

    await setGalleryImg(() => {
      return newGallaryImage;
    })

    await setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newGallaryImage,
          setGalleryImg,
          isZoomScaleGrid,
          scaleGridCanvasRef)
      }
    });
  }
  function orientationHorizontalClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'horizontal', lastOffsetValueX: 0 })
    setGalleryImg(() => {
      return newGallaryImage;
    })

    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newGallaryImage,
          setGalleryImg,
          isZoomScaleGrid,
          scaleGridCanvasRef)
      }
    });
  }
  function orientationVerticalClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'vertical', lastOffsetValueX: 0 })
    setGalleryImg(() => {
      return newGallaryImage;
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newGallaryImage,
          setGalleryImg,
          isZoomScaleGrid,
          scaleGridCanvasRef)
      }
    });
  }
  function orientation9X6ClickHandler() {
    setToolState((prev) => {
      const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: '9X6', lastOffsetValueX: 0 })

      setGalleryImg(() => {
        return newGallaryImage;
      })

      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newGallaryImage,
          setGalleryImg,
          isZoomScaleGrid,
          scaleGridCanvasRef)
      }
    });
  }
  function orientation6X9ClickHandler() {
    setToolState((prev) => {
      const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: '6X9', lastOffsetValueX: 0 })

      setGalleryImg(() => {
        return newGallaryImage;
      })

      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newGallaryImage,
          setGalleryImg,
          isZoomScaleGrid,
          scaleGridCanvasRef)
      }
    });
  }
  function arrowColorChangeHandler(event) {
    // setCanvasState((prev) => { return { ...prev, arrowsColor: event.target.value } });
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsColor: event.target.value });
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          galleryImg,
          setGalleryImg)
      }
    });
  }
  function arrowWidthChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, arrowsWidth: event.target.value });

    setGalleryImg((prev) => {
      return newState;
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          newState,
          setGalleryImg)
      }
    });
  }
  function arrowTextDescChangeHandler(event) {
    let arr
    if (arrowDescState.length === 0) {
      const arrTemp = galleryImg.getArrowsArray();
      arr = arrTemp.map((item) => { return Object.assign(new Arrow_entity(), item) });
    } else {
      arr = arrowDescState.map((item) => { return Object.assign(new Arrow_entity(), item) });
    }

    for (const item of arr) {
      if (item.getNumber() === event.target.id) {
        item.setText(event.target.value);
      };
    }

    setArrowDescState(arr);
    // setGalleryImg((prev) => {
    //   return Object.assign(new GallaryImage(), { ...prev, arrowsArray: arr });
    // })
  }
  function imgDescChangeHandler(event) {


    setImgDescState(event.target.value)

    // setGalleryImg((prev) => {
    //   return Object.assign(new GallaryImage(), { ...prev, imgDesc: event.target.value });
    // })
  }
  function arrowTextDescDeleteClickHandler(event) {
    const filrerArray = [...galleryImg.arrowsArray].filter((item) => {
      if (item.getNumber() !== event.target.id)
        return item;
      return false;
    });

    const numberingArray = filrerArray.map((item, i) => {
      item.setNumber(i + 1)
      return item;
    })
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: numberingArray });
    })
  }
  function cutClickHandler() {
    const newState = Object.assign(new GallaryImage(), {...galleryImg,
      contrast: canvasToolState.contrast,
      brightness: canvasToolState.brightness,
      saturate: canvasToolState.saturate
    });
    setGalleryImg((prev) => {
      return newState;
    })
    setCanvasToolState({
      ...canvasToolState,
      contrast: '100',
      brightness: '100',
      saturate: '100'
    })
    setIsZoomScaleGrid(false)
    setTimeout(() => {
      cutImgInGallery(canvasRef, galleryImg, setGalleryImg, setToolState)
    }, 0)
  }
  function zoomScaleGridClickHandler(event) {
    if (isZoomScaleGrid) {
      setIsZoomScaleGrid(false)
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            galleryImg,
            setGalleryImg,
            false,
            scaleGridCanvasRef)
        }
      });
    } else {
      setIsZoomScaleGrid(true)
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            galleryImg,
            setGalleryImg,
            true,
            scaleGridCanvasRef)
        }
      });
    }

    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn');
    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn-active');
  }
  function rotationLeftDownHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft-active')
  }
  function rotationLeftUpHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft-active')
    const newState = Object.assign(new GallaryImage(), { ...galleryImg });
    newState.setRotationDegrees(`${+newState.getRotationDegrees() - 90}`)
    if (+newState.getRotationDegrees() < -180) newState.setRotationDegrees('-180')
    setGalleryImg((prev) => {
      return newState;
    })
  }
  function rotationRightDownHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight-active')
  }
  function rotationRightUpHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight-active')
    const newState = Object.assign(new GallaryImage(), { ...galleryImg });
    newState.setRotationDegrees(`${+newState.getRotationDegrees() + 90}`)
    if (+newState.getRotationDegrees() > 180) newState.setRotationDegrees('180')
    setGalleryImg((prev) => {
      return newState;
    })
  }
  function renderProperties(toolType) {

    if (toolType === 'hand') {
      return (
        <>
          {galleryImg.getImgCuted() ? <div className='modal-content-grid-properties-right-block'></div> : null}
          <div className='modal-content-grid-properties-right-title'>Ориентация:</div>
          <div className='modal-content-grid-properties-right-orientation'>
            <div className={galleryImg.getOrientation() === "panorama" ?
              'modal-content-grid-properties-right-orientation-panorama-active' :
              'modal-content-grid-properties-right-orientation-panorama'}
              onClick={orientationPanoramaClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "horizontal" ?
              'modal-content-grid-properties-right-orientation-horizontal-active' :
              'modal-content-grid-properties-right-orientation-horizontal'}
              onClick={orientationHorizontalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "vertical" ?
              'modal-content-grid-properties-right-orientation-vertical-active' :
              'modal-content-grid-properties-right-orientation-vertical'}
              onClick={orientationVerticalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "9X6" ?
              'modal-content-grid-properties-right-orientation-9X6-active' :
              'modal-content-grid-properties-right-orientation-9X6'}
              onClick={orientation9X6ClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "6X9" ?
              'modal-content-grid-properties-right-orientation-6X9-active' :
              'modal-content-grid-properties-right-orientation-6X9'}
              onClick={orientation6X9ClickHandler}
            ></div>
          </div>
          <div className='modal-content-grid-properties-right-scale_grid'>
            <div className={'modal-content-grid-properties-right-orientation-scale_grid-btn'}
              onClick={event => zoomScaleGridClickHandler(event)}
            ></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-btn"></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-rotateLeft"
              onMouseDown={rotationLeftDownHandler}
              onMouseUp={rotationLeftUpHandler}
            ></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-rotateRight"
              onMouseDown={rotationRightDownHandler}
              onMouseUp={rotationRightUpHandler}
            ></div>
          </div>
          <ModalCanvasTools
            galleryImg={galleryImg}
            setGalleryImg={setGalleryImg}
            canvasToolState={canvasToolState}
            setCanvasToolState={setCanvasToolState}
          />
          <div className='modal-content-grid-properties-right-cut-btn'
            onClick={cutClickHandler}>{galleryImg.getImgCuted() ? "Готово" : "Применить"}</div>
        </>
      );
    };

    if (toolType === 'arrow') {
      return (
        <>
          <div className='modal-content-grid-properties-right-title'>Цвет стрелок:</div>
          <div className='modal-content-grid-properties-right-arrow-color'>
            <input
              type="color"
              value={galleryImg.getArrowsColor()}
              onChange={arrowColorChangeHandler}
            ></input>
          </div>
          <div className='modal-content-grid-properties-right-title'>Ширина стрелок:</div>
          <div className='modal-content-grid-properties-right-zoom'>
            <div className='modal-content-grid-properties-right-zoom-range'>
              <input
                type="range"
                step="1"
                min="1"
                max="5"
                value={galleryImg.getArrowsWidth()}
                onChange={arrowWidthChangeHandler}
              ></input>
            </div>
            <div className='modal-content-grid-properties-right-zoom-scale'>Значение: {galleryImg.getArrowsWidth()}</div>
          </div>
        </>
      );
    };

    if (toolType === 'arrowTextDesc') {

      if (galleryImg.getArrowsArray().length > 0) {
        const tempRendArray = [];
        for (const item of galleryImg.getArrowsArray()) {
          tempRendArray.push(
            <div className='modal-content-grid-properties-right-list_item' key={item.getNumber()}>
              <div className='modal-content-grid-properties-right-list_item-number'>{item.getNumber()}</div>
              <input
                type="text"
                id={item.getNumber()}
                placeholder='Введите описание...'
                value={arrowDescState[item.getNumber() - 1] ? arrowDescState[item.getNumber() - 1].getText() : item.getText()}
                onChange={arrowTextDescChangeHandler}
              ></input>
              <div
                className='modal-content-grid-properties-right-list_item-delete'
                id={item.getNumber()}
                onClick={arrowTextDescDeleteClickHandler}
              ></div>
            </div>
          );
        }
        return tempRendArray;
      }

      return (<div className='modal-content-grid-properties-right-title'>Данные о стрелках отсутствуют</div>);
    };

    if (toolType === 'imgDesc') {
      return (
        <div className='modal-content-grid-properties-right-text-area'>
          <textarea
            placeholder='Введите описание изображения...'
            value={imgDescState ? imgDescState : galleryImg.getImgDesc()}
            // value={galleryImg.getImgDesc() ? galleryImg.getImgDesc() : imgDescState}
            onChange={imgDescChangeHandler}
            maxLength={galleryImg.getOrientation() === 'vertical' ? 46 : 150}
          ></textarea>
        </div>
      );
    };
  }
  function getCanvasSize(orientation) {
    if (orientation === "horizontal" || orientation === "9X6") {
      let canvasWidth = 0
      let canvasHeight = 0
      let height = ((window.outerHeight - 50) / 100) * 80
      if (((height / 3) * 4) > (((window.outerWidth - 350) / 100) * 80)) {
        canvasWidth = ((window.outerWidth - 350) / 100) * 80
        canvasHeight = (canvasWidth / 4) * 3
      } else {
        canvasWidth = ((height / 3) * 4)
        canvasHeight = height
      }
      return ({ width: canvasWidth, height: canvasHeight })
    }
    if (orientation === "vertical" || orientation === "6X9") {
      let canvasWidth = 0
      let canvasHeight = 0
      let width = ((window.outerWidth - 350) / 100) * 80
      if (((width / 3) * 4) > (((window.outerHeight - 50) / 100) * 80)) {
        canvasHeight = ((window.outerHeight - 50) / 100) * 80
        canvasWidth = (canvasHeight / 4) * 3
      } else {
        canvasHeight = ((height / 3) * 4)
        canvasWidth = width
      }
      return ({ width: canvasWidth, height: canvasHeight })
    }
  }

  useEffect(() => {
    galleryImages.forEach((item) => {
      if (item.getIndex() === indexImgInGallery) {
        const newGalleryImg = Object.assign(new GallaryImage(), item);
        setGalleryImg(() => {
          return newGalleryImg;
        })
      }
    })
  }, [])



  useEffect(() => {
    if (galleryImg.getOrientation() === "panorama") {
      let canvasWidth = 0
      let canvasHeight = 0
      let imgWidth = 0
      let imgHeight = 0
      const img = new Image()
      img.onload = function () {
        imgWidth = this.width
        imgHeight = this.height
        canvasWidth = ((window.outerWidth - 350) / 100) * 80
        canvasHeight = (canvasWidth * imgHeight) / imgWidth
        canvasSize = { width: canvasWidth, height: canvasHeight }
        renderImgInCanvas(canvasRef, canvasSize.width, canvasSize.height, galleryImg)
      }
      img.src = galleryImg.getUrl();
    } else {
      canvasSize = getCanvasSize(galleryImg.getOrientation())
      renderImgInCanvas(canvasRef, canvasSize.width, canvasSize.height, galleryImg)
      renderScaleGridInCanvas(scaleGridCanvasRef, canvasSize.width, canvasSize.height, galleryImg, isZoomScaleGrid)
    }
  }, [galleryImg, isZoomScaleGrid]);

  return (
    <div className="modal-content-grid-edit">
      <div className='modal-content-grid-tools-left'>
        <div className={
          toolState.type === 'hand'
            ? 'modal-content-grid-tools-left-hand-active'
            : 'modal-content-grid-tools-left-hand'} onClick={handClickHandler}></div>
        <div className={
          toolState.type === 'arrow'
            ? 'modal-content-grid-tools-left-arrow-active'
            : 'modal-content-grid-tools-left-arrow'} onClick={arrowClickHandler}></div>
        <div className={
          toolState.type === 'arrowTextDesc'
            ? 'modal-content-grid-tools-left-textDesc-active'
            : 'modal-content-grid-tools-left-textDesc'} onClick={arrowtextDescClickHandler}></div>
        <div className={
          toolState.type === 'imgDesc'
            ? 'modal-content-grid-tools-left-imgDesc-active'
            : 'modal-content-grid-tools-left-imgDesc'} onClick={imgDescClickHandler}></div>
      </div>
      <canvas
        ref={canvasRef}
        className='modal-content-grid-canvas'
        // style={canvasToolState.contrast !== '100' ? canvasStyle : null}
        style={ canvasStyle }
      ></canvas>
      <canvas
        ref={scaleGridCanvasRef}
        className='modal-content-grid-canvas-scaleGrid'
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
      <div className='modal-content-grid-properties-right'>
        <div className='modal-content-grid-properties-right-title'>Свойства</div>
        {renderProperties(toolState.type)}
      </div>
    </div>
  );
}

export default ModalCanvas;