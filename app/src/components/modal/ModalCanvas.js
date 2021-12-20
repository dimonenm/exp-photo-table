import React, { useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../App';
import './MadalCanvas.css'

const Canvas = () => {
  const canvasRef = useRef();
  const localModalProperties = useContext(modalDataContext);



  useEffect(() => {
    canvasRef.current.getContext('2d');
    console.log('canvasRef: ', canvasRef);
    // const img = new Image();
    // img.onload = function () {
    //   canvasRef.current.drawImage(img, 0, 0)
    // }
    // img.src = localModalProperties.modalProperties.urlImg;  
  }, [])

  return (
    <div className="modal-content-grid-edit">
      <div className='modal-content-grid-tools-left'></div>
      <canvas ref={canvasRef} className='modal-content-grid-canvas' width={700} height={525}></canvas>
      <div className='modal-content-grid-tools-right'></div>
    </div>

  );
}

export default Canvas;