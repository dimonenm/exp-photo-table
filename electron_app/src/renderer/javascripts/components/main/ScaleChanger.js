import React from "react";
import { useState } from "react";

function ScaleChanger({ setWorkPlaceStyle, setPreviewPageScale }) {

    const [scaleBtn, setScaleBtn] = useState({
        type: '50',
        isActive: true
    })

    const changeScaleClickHandler100 = (event) => {


        setWorkPlaceStyle({
            flexBasis: '510px'
        })
        setPreviewPageScale({
            transform: 'scale(1.5) translate(0px, -72px)',
            margin: '225px 0 0 0'
        })
        setScaleBtn({
            type: '100',
            isActive: true
        })
    }
    const changeScaleClickHandler75 = (event) => {
        setWorkPlaceStyle({
            flexBasis: '442px'
        })
        setPreviewPageScale({
            transform: 'scale(1.3) translate(0px, -50px)',
            margin: '140px 0 0 0'
        })
        setScaleBtn({
            type: '75',
            isActive: true
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
        setScaleBtn({
            type: '50',
            isActive: true
        })
    }

    const showInfo = (event) => {

        event.target.childNodes[1].classList.add("info-active")
    }
    const hideInfo = (event) => {
        event.target.childNodes[1].classList.remove("info-active")

    }
    return (
        <div className="scale-changer">
            <div className="scale-changer-wrapper">
                <div className={scaleBtn.type === '100' && scaleBtn.isActive ? "scale-changer-100-active" : "scale-changer-100"} onClick={changeScaleClickHandler100} onMouseEnter={showInfo} onMouseLeave={hideInfo}>100% <div className="info">Данные кнопки изменяют масштаб страниц</div></div>
                <div className={scaleBtn.type === '75' && scaleBtn.isActive ? "scale-changer-75-active" : "scale-changer-75"} onClick={changeScaleClickHandler75} onMouseEnter={showInfo} onMouseLeave={hideInfo}>75% <div className="info">Данные кнопки изменяют масштаб страниц</div></div>
                <div className={scaleBtn.type === '50' && scaleBtn.isActive ? "scale-changer-50-active" : "scale-changer-50"} onClick={changeScaleClickHandler50} onMouseEnter={showInfo} onMouseLeave={hideInfo}>50% <div className="info">Данные кнопки изменяют масштаб страниц</div></div>
            </div>
        </div>
    )

}
export default ScaleChanger