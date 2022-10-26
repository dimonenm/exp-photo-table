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
                <div className="orientation-menu-horizontal-15x10-btn">
                    15x10
                </div>
            </div>
        )
    }
    if (type === '10x15') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-10x15-btn">
                    10x15
                </div>
            </div>
        )
    }
    if (type === '12x9') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-horizontal-12x9-btn">
                    12x9
                </div>
            </div>
        )
    }
    if (type === '9x12') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-9x12-btn">
                    9x12
                </div>
            </div>
        )
    }
    if (type === '9x6') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-horizontal-9x6-btn">
                    9x6
                </div>
            </div>
        )
    }
    if (type === '6x9') {
        return (
            <div className="orientation-menu-btn"
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragdrop}>
                <div className="orientation-menu-vertical-6x9-btn">
                    6x9
                </div>
            </div>
        )
    }
    return null
}
export default OrientationBtn;