import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import './MadalCanvas.css'
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import HandFree from './tools/HandFree';

const Canvas = () => {
  const [canvasState, setCanvasState] = useState()
  const [toolState, setToolState] = useState()
  const canvasRef = useRef();
  const localModalProperties = useContext(modalDataContext);

  function clickHandler(canvas) {
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
  }

  let hand;
  function handClickHandler(event) {
    event.target.classList.toggle ('modal-content-grid-tools-right-hand');
    event.target.classList.toggle('modal-content-grid-tools-right-hand-active');
    if (event.target.classList.contains('modal-content-grid-tools-right-hand-active')) {
      hand = new Hand(canvasRef.current);
      console.log('hand1: ', hand);
      // setToolState(hand);
    } else {
      // setToolState(null);
      hand = new HandFree(canvasRef.current);
      console.log('hand2: ', hand);
    };
  }
  function arrowClickHandler(event) {
    event.target.classList.toggle('modal-content-grid-tools-right-arrow');
    event.target.classList.toggle('modal-content-grid-tools-right-arrow-active');
    if (event.target.classList.contains('modal-content-grid-tools-right-arrow-active')) {
      hand = new Arrow(canvasRef.current);
      console.log('hand3: ', hand);
      // setToolState(new Arrow(canvasRef.current));      
    } else {
      // setToolState(null);
      hand = new HandFree(canvasRef.current);
      console.log('hand4: ', hand);
    };
  }

  useEffect(() => {
    setCanvasState(canvasRef.current);
    // setToolState(new Arrow(canvasRef.current));
  }, [])
  
  return (
    <div className="modal-content-grid-edit">
      <div className='modal-content-grid-tools-left' onClick={() => clickHandler(canvasState)}></div>
      <canvas ref={canvasRef} className='modal-content-grid-canvas' width={700} height={525}></canvas>
      <div className='modal-content-grid-tools-right' >
        <div className='modal-content-grid-tools-right-hand' onClick={handClickHandler}></div>
        <div className='modal-content-grid-tools-right-arrow' onClick={arrowClickHandler}></div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>

  );
}

export default Canvas;