import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import './ModalCanvas.scss';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';

const ModalCanvas = () => {
  const localModalProperties = useContext(modalDataContext);
  const [canvasState, setCanvasState] = useState(
    {
      orientation: 'horizontal',
      img: localModalProperties.modalProperties.urlImg,
      lastOffsetValue: 0,
      arrows: []
    }
  );
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
            localModalProperties.modalProperties.urlImg,
            canvasState,
            setCanvasState)
        }
      });
    };
  }
  function arrowClickHandler(event) {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      setToolState((prev) => { return { ...prev, type: 'arrow', tool: new Arrow(canvasRef.current) } });
    };
  }
  function orientationVerticalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'vertical', lastOffsetValue: 0 } })
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "785" } });
    if (toolState.type === 'hand') {
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            localModalProperties.modalProperties.urlImg,
            canvasState,
            setCanvasState)
        }
      });
    }
  }
  function orientationHorizontalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'horizontal', lastOffsetValue: 0 } });
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "960" } });
    if (toolState.type === 'hand') {
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            localModalProperties.modalProperties.urlImg,
            canvasState,
            setCanvasState)
        }
      });
    }
  }
  function orientationPanoramaClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'panorama', lastOffsetValue: 0 } })
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "1010" } });
    if (toolState.type === 'hand') {
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand(
            canvasRef.current,
            localModalProperties.modalProperties.urlImg,
            canvasState,
            setCanvasState)
        }
      });
    }
  }



  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.onload = function () {
      // console.log('width ctx', ctx.canvas.width);
      // console.log('height ctx', ctx.canvas.height);
      // console.log('ctx', ctx);

      const pr = ctx.canvas.height * 100 / this.height;
      const imgW = this.width / 100 * pr;
      const imgH = this.height / 100 * pr;

      ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + canvasState.lastOffsetValue, 0, imgW, imgH);
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
      // width={700}
      // height={525}
      ></canvas>
      <div className='modal-content-grid-properties-right' >
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
              step="0.1"
              min="0.1"
              max="2"
            ></input>
          </div>
          <div className='modal-content-grid-properties-right-zoom-scale'>Увеличение: 100%</div>
        </div>
      </div>
    </div>

  );
}

export default ModalCanvas;