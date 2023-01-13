import React from "react";
import { useState } from "react";

function ScaleChanger({ workPlaceStyle, setWorkPlaceStyle, previewPageScale, setPreviewPageScale }) {
    console.log(setPreviewPageScale);

    const changeScaleClickHandler100 = (event) => {
        setWorkPlaceStyle({
            flexBasis: '490px'
        })
        setPreviewPageScale({
            transform: 'scale(1.5) translate(0px, -72px)',
            margin: '225px 0 0 0'
        })
    }
    const changeScaleClickHandler75 = (event) => {
        setWorkPlaceStyle({
            flexBasis: '420px'
        })
        setPreviewPageScale({
            transform: 'scale(1.3) translate(0px, -115px)',
            margin: '140px 0 0 0'
        })
    }
    const changeScaleClickHandler50 = (event) => {
        setWorkPlaceStyle({
            flexBasis: '340px'
        })
        setPreviewPageScale({
            transform: 'scale(1) translate(0px, 0px)',
            margin: '10px 0 0 0'
        })
    }


    return (
        <div className="scale-changer">
            <div className="scale-changer-wrapper">
                <div className="scale-changer-50" onClick={changeScaleClickHandler50}>50</div>
                <div className="scale-changer-75" onClick={changeScaleClickHandler75}>75</div>
                <div className="scale-changer-100" onClick={changeScaleClickHandler100}>100</div>
            </div>
        </div>
    )

}
export default ScaleChanger