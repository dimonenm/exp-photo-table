import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';
import { renderImgInCanvas } from '../../../services/forModalCanvas/renderFunctions'
import { cutImgInGallery } from '../../../services/forModalCanvas/cuttingFunctions'
import GallaryImage from '../../../entities/GalleryImage';

const ModalCanvas = () => {
  const localModalProperties = useContext(modalDataContext);

  const galleryImg = localModalProperties.galleryImg;
  const setGalleryImg = localModalProperties.setGalleryImg;
  const galleryImages = localModalProperties.galleryImages;
  const indexImgInGallery = localModalProperties.modalProperties.indexImgInGallery;
  const [toolState, setToolState] = useState({ type: 'handFree', tool: null });
  let canvasSize = { width: 0, height: 0 };
  const [isZoomScaleGrid, setIsZoomScaleGrid] = useState(false);
  const canvasRef = useRef();

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
            isZoomScaleGrid)
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
          galleryImg,
          setGalleryImg)
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
          isZoomScaleGrid)
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
          isZoomScaleGrid)
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
          isZoomScaleGrid)
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
          isZoomScaleGrid)
      }
    });
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
    // setCanvasState((prev) => { return { ...prev, arrowsWidth: event.target.value } });

    const newState = Object.assign(new GallaryImage(), { ...galleryImg, arrowsWidth: event.target.value });

    setGalleryImg((prev) => {
      // return Object.assign(new GallaryImage(), { ...prev, arrowsWidth: event.target.value });
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
    const arr = [...galleryImg.getArrowsArray()];

    for (const item of arr) {
      if (item.getNumber() === event.target.id) {
        item.setText(event.target.value);
      };
    }
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: arr });
    })
  }
  function imgDescChangeHandler(event) {
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, imgDesc: event.target.value });
    })
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
            false)
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
            true)
        }
      });
    }

    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn');
    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn-active');
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
          <div className='modal-content-grid-properties-right-title'>Масштабная сетка:</div>
          <div className='modal-content-grid-properties-right-scale_grid'>
            <div className={'modal-content-grid-properties-right-orientation-scale_grid-btn'}
              onClick={event => zoomScaleGridClickHandler(event)}
            ></div>
          </div>
          <div className='modal-content-grid-properties-right-title'>Масштаб:</div>
          <div className='modal-content-grid-properties-right-zoom'>
            <div className='modal-content-grid-properties-right-zoom-range'>
              <input
                type="range"
                step="10"
                min="100"
                max="400"
                value={galleryImg.getZoom()}
                onChange={zoomRangeChangeHandler}
              ></input>
            </div>
            <div className='modal-content-grid-properties-right-zoom-scale'>Увеличение: {galleryImg.getZoom()}%</div>
          </div>
          <div className='modal-content-grid-properties-right-title'>Вырезание:</div>
          <div className='modal-content-grid-properties-right-cut'>
            <div className='modal-content-grid-properties-right-cut-btn'
              onClick={cutClickHandler}
              onMouseDown={(event) => {
                event.target.classList = '';
                event.target.classList.add('modal-content-grid-properties-right-cut-btn-active');
              }}
              onMouseUp={(event) => {
                event.target.classList = '';
                event.target.classList.add('modal-content-grid-properties-right-cut-btn');
              }}
              onMouseLeave={(event) => {
                event.target.classList = '';
                event.target.classList.add('modal-content-grid-properties-right-cut-btn');
              }}
            ></div>
            <div className='modal-content-grid-properties-right-cut-condition'>{galleryImg.getImgCuted() ? "Вырезано" : "Не вырезано"}</div>
          </div>
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
                value={item.getText()}
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
            value={galleryImg.getImgDesc()}
            onChange={imgDescChangeHandler}
            maxLength={galleryImg.getOrientation() === 'vertical' ? 46 : 150}
          ></textarea>
        </div>
      );
    };
  }
  function getCanvasSize(orientation) {
    // if (orientation === "panorama") {
    //   let canvasWidth = 0
    //   let canvasHeight = 0
    //   let imgWidth = 0
    //   let imgHeight = 0
    //   const img = new Image()
    //   img.onload = function () {
    //     imgWidth = this.width
    //     imgHeight = this.height
    //     canvasWidth = ((window.outerWidth - 350) / 100) * 80
    //     canvasHeight = (canvasWidth * imgHeight) / imgWidth
    //     return ({ width: canvasWidth, height: canvasHeight })
    //   }
    //   img.src = galleryImg.getUrl();
    // }
    if (orientation === "horizontal") {
      let canvasWidth = 0
      let canvasHeight = 0
      let height = ((window.outerHeight - 50) / 100) * 80
      if (((height / 2) * 3) > (((window.outerWidth - 350) / 100) * 80)) {
        canvasWidth = ((window.outerWidth - 350) / 100) * 80
        canvasHeight = (canvasWidth / 3) * 2
      } else {
        canvasWidth = ((height / 2) * 3)
        canvasHeight = height
      }
      return ({ width: canvasWidth, height: canvasHeight })
    }
    if (orientation === "9X6") {
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
    // eslint-disable-next-line
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
        renderImgInCanvas(canvasRef, canvasSize.width, canvasSize.height, galleryImg, isZoomScaleGrid)
      }
      img.src = galleryImg.getUrl();
    } else {
      canvasSize = getCanvasSize(galleryImg.getOrientation())
      renderImgInCanvas(canvasRef, canvasSize.width, canvasSize.height, galleryImg, isZoomScaleGrid)
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