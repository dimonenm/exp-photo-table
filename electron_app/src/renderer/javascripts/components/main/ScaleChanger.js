import React from "react";
import { useState } from "react";

function ScaleChanger({ workPlaceStyle, setWorkPlaceStyle, previewPageScale, setPreviewPageScale }) {
    console.log(setPreviewPageScale);
  
    const changeScaleClickHandler100 = (event)=> {
        setWorkPlaceStyle({
            flexBasis: '490px'
        })
        setPreviewPageScale({
            transform: 'scale(1.5) translate(0px, 72px)'
        })
    }
    

    return (
        <div className="scale-changer">
            <div className="scale-changer-wrapper">
                <div className="scale-changer-50" >50</div>
                <div className="scale-changer-75" >75</div>
                <div className="scale-changer-100" onClick={changeScaleClickHandler100}>100</div>
            </div>
        </div>
    )

}
export default ScaleChanger