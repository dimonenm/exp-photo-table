import React from 'react';
import "./MenuItem.css";

const MenuItem = ({ children, notActive, inputFile, setDownloadedImages }) => {

    function loadImgs(event) {
        event.preventDefault();
        const input = document.querySelector('.file');
        function change() {
            const imagedata = [];

            for (let i = 0; i < input.files.length; i++) {
                imagedata.push({ name: input.files[i].name, url: URL.createObjectURL(input.files[i])});
            }

            setDownloadedImages(imagedata)
            input.removeEventListener('change', change);
        }
        input.click();
        input.addEventListener('change', change);
    }

    if (notActive) {
        return (
            <div className="menu-item menu-not-active"><a href="/" onClick={(event) => {event.preventDefault()}}>{children}</a></div>
        );
    }
    if (inputFile) {
        return (
            <div className="menu-item input-file">
                <input type="file" className="file" multiple={true} accept="image/*"></input>
                <a href="/" onClick={loadImgs}>{children}</a>
            </div>
        );
    }
    return (
        <div className="menu-item"><a href="/" >{children}</a></div>
    );

}

export default MenuItem;