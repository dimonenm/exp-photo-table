import React from "react";

const OrientationPanoramaBtn = ({ children }) => {
    return (
        <div className="orientation-menu-btn">
        <div className="orientation-menu-panorama-btn">
            {children}
        </div>
        </div>
    )
}
export default OrientationPanoramaBtn;