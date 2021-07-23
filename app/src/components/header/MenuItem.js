import React from 'react';
import "./MenuItem.css";

const MenuItem = ({ children, notActive, inputFile, downloadedImages, setDownloadedImages }) => {
    function clickHandler(event) {
        event.preventDefault();
        console.log('click');
    }
    function loadImgs(event) {
        event.preventDefault();
        const input = document.querySelector('.file');
        function change() {
            const imagedata = input.files[0];
            console.log(imagedata);

            // let formData = new FormData();
            // formData.append('myfile', imagedata[0], 'img1.jpg');
            // console.dir(formData);

            let reader = new FileReader();
            // let url = new URL();
            reader.readAsDataURL(imagedata);
            reader.onload = () => {
                console.log(reader.result);
            }
            reader.onerror = () => {
                console.log(reader.error);
            }
            let currentUrl = reader.result;
            console.log(currentUrl);


            setDownloadedImages(imagedata)
            input.removeEventListener('change', change);
        }
        input.click();
        input.addEventListener('change', change);
    }

    if (notActive) {
        return (
            <div className="menu-item menu-not-active"><a href="/" onClick={clickHandler}>{children}</a></div>
        );
    }
    if (inputFile) {
        return (
            <div className="menu-item input-file">
                <input type="file" className="file" multiple={true} ></input>
                <a href="/" onClick={loadImgs}>{children}</a>
            </div>
        );
    }
    return (
        <div className="menu-item"><a href="/" onClick={clickHandler}>{children}</a></div>
    );

}

export default MenuItem;