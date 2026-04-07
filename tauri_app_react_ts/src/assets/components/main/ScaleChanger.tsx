import React, { useState } from "react"
import "./ScaleChanger.css"

interface ScaleChangerProps { }

function ScaleChanger({ }: ScaleChangerProps): React.JSX.Element {

    return (
        <div className="scale-changer">
            <div className="scale-changer-wrapper">
                <div>100%
                    <div className="info">Данные кнопки изменяют масштаб страниц</div>
                </div>
                <div>75%
                    <div className="info">Данные кнопки изменяют масштаб страниц</div>
                </div>
                <div>50%
                    <div className="info">Данные кнопки изменяют масштаб страниц</div>
                </div>
            </div>
        </div>
    )
}

export default ScaleChanger
