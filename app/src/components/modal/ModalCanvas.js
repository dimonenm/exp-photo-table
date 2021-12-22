import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../App';
import './MadalCanvas.css'

const Canvas = () => {
  const [localCanvas, setLocalCanvas] = useState()
  const canvasRef = useRef();
  const localModalProperties = useContext(modalDataContext);

  function clickHandler(ctx) {
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
  function clickHandler2(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(700, 525);
    ctx.stroke();
  }

  useEffect(() => {
    setLocalCanvas(canvasRef.current.getContext('2d'));
  }, [])

  return (
    <div className="modal-content-grid-edit">
      <div className='modal-content-grid-tools-left' onClick={() => clickHandler(localCanvas)}></div>
      <canvas ref={canvasRef} className='modal-content-grid-canvas' width={700} height={525}></canvas>
      <div className='modal-content-grid-tools-right' onClick={() => clickHandler2(localCanvas)}>
        <div className='modal-content-grid-tools-right-hand'>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>

  );
}

export default Canvas;