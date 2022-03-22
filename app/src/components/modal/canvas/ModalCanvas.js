import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';
import drawArrowArray from '../../../services/forModalCanvas/fDrawArrowArray';

import GallaryImage from '../../../entities/GalleryImage';

import './ModalCanvas.scss';

const ModalCanvas = () => {
  const localModalProperties = useContext(modalDataContext);

  const galleryImg = localModalProperties.galleryImg;
  const setGalleryImg = localModalProperties.setGalleryImg;
  const galleryImages = localModalProperties.galleryImages;
  const indexImgInGallery = localModalProperties.modalProperties.indexImgInGallery;
  const [toolState, setToolState] = useState({
    type: 'handFree',
    tool: null
  });
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
            setGalleryImg)
        }
      });
    };
  }
  function arrowClickHandler(event) {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          console.log('url: ', url);
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            });
          });
          setToolState((prev) => {
            return {
              ...prev,
              type: 'arrow',
              tool: new Arrow(
                canvasRef.current,
                Object.assign(new GallaryImage(), {
                  ...galleryImg,
                  url: url,
                  imgCuted: true,
                  lastOffsetValueX: 0,
                  lastOffsetValueY: 0,
                  zoom: '100'
                }),
                setGalleryImg)
            }
          });
        }, 'image/jpeg', 1);
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
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            });
          });
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
      if (!galleryImg.getImgCuted()) {
        canvasRef.current.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setGalleryImg((prev) => {
            return Object.assign(new GallaryImage(), {
              ...prev,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            });
          });
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
    // setCanvasState((prev) => { return { ...prev, orientation: 'vertical', lastOffsetValueX: 0 } })
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, orientation: 'vertical', lastOffsetValueX: 0 });
    })
    setToolState((prev) => {
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
    // setCanvasState((prev) => { return { ...prev, orientation: 'horizontal', lastOffsetValueX: 0 } });
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, orientation: 'horizontal', lastOffsetValueX: 0 });
    })
    setToolState((prev) => {
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
  function orientationPanoramaClickHandler() {
    // setCanvasState((prev) => { return { ...prev, orientation: 'panorama', lastOffsetValueX: 0 } });
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, orientation: 'panorama', lastOffsetValueX: 0 });
    })
    setToolState((prev) => {
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
  function zoomRangeChangeHandler(event) {
    // setCanvasState((prev) => { return { ...prev, zoom: event.target.value } });

    const newState = Object.assign(new GallaryImage(), { ...galleryImg, zoom: event.target.value });

    setGalleryImg((prev) => {
      // return Object.assign(new GallaryImage(), { ...prev, zoom: event.target.value });
      return newState;
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          newState,
          setGalleryImg)
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

    // setCanvasState((prev => {
    //   return {
    //     ...prev,
    //     arrowsArray: numberingArray
    //   };
    // }))
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: numberingArray });
    })
  }
  function cutClickHandler(event) {

    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setGalleryImg((prev) => {
        return Object.assign(new GallaryImage(), {
          ...prev,
          url: url,
          imgCuted: true,
          lastOffsetValueX: 0,
          lastOffsetValueY: 0,
          zoom: '100'
        });
      })
      setToolState((prev) => {
        return {
          ...prev,
          type: 'handFree',
          tool: new HandFree(canvasRef.current)
        }
      });
    }, 'image/jpeg', 1)
  }
  function renderProperties(toolType) {
    if (toolType === 'hand') {
      return (
        <>
          {galleryImg.getImgCuted() ? <div className='modal-content-grid-properties-right-block'></div> : null}
          <div className='modal-content-grid-properties-right-title'>Ориентация:</div>
          <div className='modal-content-grid-properties-right-orientation'>
            <div
              className={galleryImg.getOrientation() === "vertical" ?
                'modal-content-grid-properties-right-orientation-vertical-active' :
                'modal-content-grid-properties-right-orientation-vertical'}
              onClick={orientationVerticalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "horizontal" ?
              'modal-content-grid-properties-right-orientation-horizontal-active' :
              'modal-content-grid-properties-right-orientation-horizontal'}
              onClick={orientationHorizontalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "panorama" ?
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
          ></textarea>
        </div>
      );
    };
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
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.onload = function () {

      const pr = ctx.canvas.height * 100 / this.height;
      const zoom = +galleryImg.getZoom() / 100;
      const imgW = (this.width / 100 * pr) * zoom;
      const imgH = (this.height / 100 * pr) * zoom;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + galleryImg.getLastOffsetValueX(), ((ctx.canvas.height - imgH) / 2) + galleryImg.getLastOffsetValueY(), imgW, imgH);

      if (galleryImg.getArrowsArray().length > 0) {
        for (const item of galleryImg.getArrowsArray()) {
          drawArrowArray(ctx, item.getNumber(), galleryImg.getArrowsColor(), galleryImg.getArrowsWidth(), item.x1, item.y1, item.x2, item.y2);
        }
      }
    }
    img.src = galleryImg.getUrl();
  }, [galleryImg]);
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
        width={galleryImg.getOrientation() === "horizontal" ? 700 :
          galleryImg.getOrientation() === "vertical" ? 525 :
            galleryImg.getOrientation() === "panorama" ? 747 : null}
        height={galleryImg.getOrientation() === "horizontal" ? 525 :
          galleryImg.getOrientation() === "vertical" ? 700 :
            galleryImg.getOrientation() === "panorama" ? 460 : null}
      ></canvas>
      <div className='modal-content-grid-properties-right'>
        <div className='modal-content-grid-properties-right-title'>Свойства</div>
        {renderProperties(toolState.type)}
      </div>
    </div>

  );
}

export default ModalCanvas;