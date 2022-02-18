import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';
import drawArrowArray from '../../../services/forModalCanvas/fDrawArrowArray';

import GallaryImage from '../../main/entities/GalleryImage';

import './ModalCanvas.scss';

const ModalCanvas = () => {
  const localModalProperties = useContext(modalDataContext);
  // console.log(localModalProperties);
  // console.log(localModalProperties.galleryImg);

  const galleryImg = localModalProperties.galleryImg;
  const setGalleryImg = localModalProperties.setGalleryImg;
  const galleryImages = localModalProperties.galleryImages;
  const indexImgInGallery = localModalProperties.modalProperties.indexImgInGallery;

  const [canvasState, setCanvasState] = useState(
    {
      orientation: 'horizontal',
      img: getCurrentImgUrl(galleryImages),
      imgDesc: '',
      imgCuted: false,
      lastOffsetValueX: 0,
      lastOffsetValueY: 0,
      zoom: '100',
      arrowsColor: '#ffffff',
      arrowsWidth: '2',
      arrowsArray: []
    }
  );
  const [toolState, setToolState] = useState({
    type: 'handFree',
    tool: null
  });
  const canvasRef = useRef();

  useEffect(() => {
    const newGalleryImg = Object.assign(new GallaryImage(), galleryImg);
    newGalleryImg.setImg(getCurrentImgUrl(galleryImages));
    newGalleryImg.setIndex(indexImgInGallery);
    console.log('newGalleryImg: ', newGalleryImg);
    setGalleryImg(() => {
      return newGalleryImg;
    })
    // eslint-disable-next-line
  }, [])
  console.log('canvasState', canvasState);
  console.log('galleryImg', galleryImg);

  //-----сервисные функции
  function getCurrentImgUrl(arr) {
    let url = '';
    arr.forEach((item) => {
      if (item.getIndex() === localModalProperties.modalProperties.indexImgInGallery) {
        url = item.getUrl();
      }
    })
    return url;
  }
  //сервисные функции-----

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
            canvasState.img,
            canvasState,
            setCanvasState,
            setGalleryImg)
        }
      });
    };
  }
  function arrowClickHandler(event) {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!canvasState.imgCuted) {
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setCanvasState((prev => {
            return {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            };
          }));
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100' });
          })
        }, 'image/jpeg', 1);
      }
      setToolState((prev) => {
        return {
          ...prev,
          type: 'arrow',
          tool: new Arrow(
            canvasRef.current,
            canvasState.img,
            canvasState,
            setCanvasState,
            setGalleryImg)
        }
      });
    };
  }
  function arrowtextDescClickHandler(event) {
    if (toolState.type === 'arrowTextDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!canvasState.imgCuted) {
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setCanvasState((prev => {
            return {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            };
          }));
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            });
          })
        }, 'image/jpeg', 1);
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
  function imgDescClickHandler(event) {
    if (toolState.type === 'imgDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!canvasState.imgCuted) {
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setCanvasState((prev => {
            return {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            };
          }));
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              img: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            });
          })
        }, 'image/jpeg', 1);
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
  function orientationVerticalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'vertical', lastOffsetValueX: 0 } })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          canvasState.img,
          canvasState,
          setCanvasState)
      }
    });
  }
  function orientationHorizontalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'horizontal', lastOffsetValueX: 0 } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          canvasState.img,
          canvasState,
          setCanvasState)
      }
    });
  }
  function orientationPanoramaClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'panorama', lastOffsetValueX: 0 } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          canvasState.img,
          canvasState,
          setCanvasState)
      }
    });
  }
  function zoomRangeChangeHandler(event) {
    setCanvasState((prev) => { return { ...prev, zoom: event.target.value } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          canvasState.img,
          { ...canvasState, zoom: event.target.value },
          setCanvasState)
      }
    });
  }
  function arrowColorChangeHandler(event) {
    setCanvasState((prev) => { return { ...prev, arrowsColor: event.target.value } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          canvasState.img,
          { ...canvasState, arrowsColor: event.target.value },
          setCanvasState)
      }
    });
  }
  function arrowWidthChangeHandler(event) {
    setCanvasState((prev) => { return { ...prev, arrowsWidth: event.target.value } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          canvasState.img,
          { ...canvasState, arrowsWidth: event.target.value },
          setCanvasState)
      }
    });
  }
  function arrowTextDescChangeHandler(event) {
    const arr = [...canvasState.arrowsArray];

    for (const item of arr) {
      if (item.getNumber() === event.target.id) {
        item.setText(event.target.value);
      };
    }

    setCanvasState((prev => {
      return {
        ...prev,
        arrowsArray: arr
      };
    }))
  }
  function imgDescChangeHandler(event) {
    setCanvasState((prev => {
      return {
        ...prev,
        imgDesc: event.target.value
      };
    }))
  }
  function arrowTextDescDeleteClickHandler(event) {
    const filrerArray = [...canvasState.arrowsArray].filter((item) => {
      if (item.getNumber() !== event.target.id)
        return item;
      return false;
    });

    const numberingArray = filrerArray.map((item, i) => {
      item.setNumber(i + 1)
      return item;
    })

    setCanvasState((prev => {
      return {
        ...prev,
        arrowsArray: numberingArray
      };
    }))
  }
  function cutClickHandler(event) {

    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setCanvasState((prev => {
        return {
          ...prev,
          img: url,
          imgCuted: true,
          lastOffsetValueX: 0,
          lastOffsetValueY: 0,
          zoom: '100'
        };
      }))
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            url,
            canvasState,
            setCanvasState)
        }
      });
    }, 'image/jpeg', 1)

  }
  function renderProperties(toolType) {
    if (toolType === 'hand') {
      return (
        <>
          {canvasState.imgCuted ? <div className='modal-content-grid-properties-right-block'></div> : null}
          <div className='modal-content-grid-properties-right-title'>Ориентация:</div>
          <div className='modal-content-grid-properties-right-orientation'>
            <div
              className={canvasState.orientation === "vertical" ?
                'modal-content-grid-properties-right-orientation-vertical-active' :
                'modal-content-grid-properties-right-orientation-vertical'}
              onClick={orientationVerticalClickHandler}
            ></div>
            <div className={canvasState.orientation === "horizontal" ?
              'modal-content-grid-properties-right-orientation-horizontal-active' :
              'modal-content-grid-properties-right-orientation-horizontal'}
              onClick={orientationHorizontalClickHandler}
            ></div>
            <div className={canvasState.orientation === "panorama" ?
              'modal-content-grid-properties-right-orientation-panorama-active' :
              'modal-content-grid-properties-right-orientation-panorama'}
              onClick={orientationPanoramaClickHandler}
            ></div>
          </div>
          <div className='modal-content-grid-properties-right-title'>Масштаб:</div>
          <div className='modal-content-grid-properties-right-zoom'>
            <div className='modal-content-grid-properties-right-zoom-range'>
              <input
                type="range"
                step="5"
                min="100"
                max="400"
                value={canvasState.zoom}
                onChange={zoomRangeChangeHandler}
              ></input>
            </div>
            <div className='modal-content-grid-properties-right-zoom-scale'>Увеличение: {canvasState.zoom}%</div>
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
            <div className='modal-content-grid-properties-right-cut-condition'>{canvasState.imgCuted ? "Вырезано" : "Не вырезано"}</div>
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
              value={canvasState.arrowsColor}
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
                value={canvasState.arrowsWidth}
                onChange={arrowWidthChangeHandler}
              ></input>
            </div>
            <div className='modal-content-grid-properties-right-zoom-scale'>Значение: {canvasState.arrowsWidth}</div>
          </div>
        </>
      );
    };

    if (toolType === 'arrowTextDesc') {
      if (canvasState.arrowsArray.length > 0) {
        const tempRendArray = [];
        for (const item of canvasState.arrowsArray) {
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
            onChange={imgDescChangeHandler}
          ></textarea>
        </div>
      );
    };
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.onload = function () {

      const pr = ctx.canvas.height * 100 / this.height;
      const zoom = +canvasState.zoom / 100;
      const imgW = (this.width / 100 * pr) * zoom;
      const imgH = (this.height / 100 * pr) * zoom;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + canvasState.lastOffsetValueX, ((ctx.canvas.height - imgH) / 2) + canvasState.lastOffsetValueY, imgW, imgH);

      if (canvasState.arrowsArray.length > 0) {
        // console.log(canvasState.arrowsArray);
        for (const item of canvasState.arrowsArray) {
          // console.log(item);
          drawArrowArray(ctx, item.getNumber(), canvasState.arrowsColor, canvasState.arrowsWidth, item.x1, item.y1, item.x2, item.y2);
        }
      }
    }
    img.src = canvasState.img;
  }, [canvasState]);
  console.log('modal canvas rendering');


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
        width={canvasState.orientation === "horizontal" ? 700 :
          canvasState.orientation === "vertical" ? 525 :
            canvasState.orientation === "panorama" ? 747 : null}
        height={canvasState.orientation === "horizontal" ? 525 :
          canvasState.orientation === "vertical" ? 700 :
            canvasState.orientation === "panorama" ? 460 : null}
      ></canvas>
      <div className='modal-content-grid-properties-right'>
        <div className='modal-content-grid-properties-right-title'>Свойства</div>
        {renderProperties(toolState.type)}
      </div>
    </div>

  );
}

export default ModalCanvas;