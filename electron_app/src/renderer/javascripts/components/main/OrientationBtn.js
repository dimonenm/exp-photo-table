import React from "react";

const OrientationBtn = ({ type }) => {
    function dragover(event) {
        event.preventDefault();
        console.log('dragover');
    }

    function dragenter(event) {
        event.preventDefault();
        console.log('dragenter');
    }

    function dragleave(event) {
        event.preventDefault();
        console.log('dragleave');
    }

    function dragdrop(event) {
        event.preventDefault();
        console.log('dragdrop');
    }






    if (type === 'panorama') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-panorama-btn">
                    Панорама
                </div>
            </div>
        )
    }
    if (type === '15x10') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-panorama-btn">
                    15x10
                </div>
            </div>
        )
    }
    return null
}
export default OrientationBtn;