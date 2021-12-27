import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { modalDataContext } from '../../../App';
import './MadalCanvas.css'
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';

const Canvas = () => {
  const [canvasState, setCanvasState] = useState()
  const [toolState, setToolState] = useState({
    type: 'handFree',
    tool: null
  })
  const canvasRef = useRef();
  const localModalProperties = useContext(modalDataContext);

  const loadImg = useCallback(
    function (canvas) {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function () {
        console.log('width', this.width);
        console.log('height', this.height);

        const pr = 52500 / this.height;
        const imgW = this.width / 100 * pr;
        const imgH = this.height / 100 * pr;

        ctx.drawImage(img, (700 - imgW) / 2, (525 - imgH) / 2, imgW, imgH)
      }
      img.src = localModalProperties.modalProperties.urlImg;
    }, [localModalProperties.modalProperties.urlImg]
  )

  // let hand;
  function handClickHandler(event) {
    if (toolState.type === 'hand') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      setToolState((prev) => { return { ...prev, type: 'hand', tool: new Hand(canvasRef.current, localModalProperties.modalProperties.urlImg) } });
    };
  }
  function arrowClickHandler(event) {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      setToolState((prev) => { return { ...prev, type: 'arrow', tool: new Arrow(canvasRef.current) } });
    };
  }

  useEffect(() => {
    loadImg(canvasRef.current);
    setCanvasState(canvasRef.current);
  }, [loadImg]);


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
      <canvas ref={canvasRef} className='modal-content-grid-canvas' width={700} height={525}></canvas>
      <div className='modal-content-grid-tools-right' >
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>

  );
}

export default Canvas;