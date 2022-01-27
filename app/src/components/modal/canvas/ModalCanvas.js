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
      setToolState((prev) => {
        return {
          ...prev,
          type: 'arrow',
          tool: new Arrow(
            canvasRef.current,
            localModalProperties.modalProperties.urlImg,
            canvasState,
            setCanvasState)
        }
      });
    };
  }
  function orientationVerticalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'vertical', lastOffsetValueX: 0 } })
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "785" } });
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
  function orientationHorizontalClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'horizontal', lastOffsetValueX: 0 } });
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "960" } });
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
  function orientationPanoramaClickHandler() {
    setCanvasState((prev) => { return { ...prev, orientation: 'panorama', lastOffsetValueX: 0 } });
    localModalProperties.setModalProperties((prev) => { return { ...prev, modalWidth: "1010" } });
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
  function zoomRangeChangeHandler(event) {
    setCanvasState((prev) => { return { ...prev, zoom: event.target.value } });
    setToolState((prev) => {
      return {
        ...prev,
        type: 'hand',
        tool: new Hand(
          canvasRef.current,
          localModalProperties.modalProperties.urlImg,
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
          localModalProperties.modalProperties.urlImg,
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
          localModalProperties.modalProperties.urlImg,
          { ...canvasState, arrowsWidth: event.target.value },
          setCanvasState)
      }
    });
  }
  function renderProperties(toolType) {
    if (toolType === 'hand') {
      return (
        <>
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
          const lineangle = Math.atan2(item.y2 - item.y1, item.x2 - item.x1);
          const d = (Math.sqrt(Math.pow((item.x1 - item.x2), 2) + Math.pow((item.y1 - item.y2), 2)) / 100) * 50;
          const angle = ((Math.PI / 2) * 25) / 100;
          const h = Math.abs((d > 20 ? 20 : d) / Math.cos(angle));

          const angle1 = lineangle + angle;
          const topx = item.x1 + Math.cos(angle1) * h;
          const topy = item.y1 + Math.sin(angle1) * h;

          const angle2 = lineangle - angle;
          const botx = item.x1 + Math.cos(angle2) * h;
          const boty = item.y1 + Math.sin(angle2) * h;

          ctx.beginPath();

          ctx.strokeStyle = canvasState.arrowsColor;
          ctx.lineWidth = canvasState.arrowsWidth;
          ctx.lineCap = 'round';
          
          ctx.moveTo(item.x1 + canvasState.lastOffsetValueX, item.y1 + canvasState.lastOffsetValueY);
          ctx.lineTo(item.x2 + canvasState.lastOffsetValueX, item.y2 + canvasState.lastOffsetValueY);

          ctx.moveTo(item.x1 + canvasState.lastOffsetValueX, item.y1 + canvasState.lastOffsetValueY);
          ctx.lineTo(Math.floor(topx) + canvasState.lastOffsetValueX, Math.floor(topy) + canvasState.lastOffsetValueY);

          ctx.moveTo(item.x1 + canvasState.lastOffsetValueX, item.y1 + canvasState.lastOffsetValueY);
          ctx.lineTo(Math.floor(botx) + canvasState.lastOffsetValueX, Math.floor(boty) + canvasState.lastOffsetValueY);

          ctx.stroke();
        }
      }
    }
    img.src = canvasState.img;
  }, [canvasState]);
  console.log('modal canvas rendering');
  // console.log('canvasState', canvasState);


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
      ></canvas>
      <div className='modal-content-grid-properties-right'>
        <div className='modal-content-grid-properties-right-title'>Свойства</div>
        {renderProperties(toolState.type)}
      </div>
    </div>

  );
}

export default ModalCanvas;