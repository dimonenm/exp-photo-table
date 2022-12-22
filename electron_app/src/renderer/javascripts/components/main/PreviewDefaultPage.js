import React from 'react';

function PreviewDefaultPage({ number, index, orientation, img, text, photoTableData, settings, setModalProperties }) {

    const imagesArr = []
    const dbClickFirstImgHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: index[0]
                }
            );
        }
        )
    }
    const dbClickSecondImgHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: index[1]
                }
            );
        }
        )
    }

    if (index[0] && img[0] && orientation[0] === 'horizontal') {
        imagesArr.push((
            <React.Fragment key={index[0]}>
                <div className="preview-default-page-img" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </React.Fragment>))
    }
    if (index[0] && img[0] && orientation[0] === 'vertical') {
        imagesArr.push((
            <React.Fragment key={index[0]}>
                <div className="preview-default-page-img-vertical" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </React.Fragment>))
    }

    if (index[1] && img[1] && orientation[1] === 'vertical') {
        imagesArr.push((
            <React.Fragment key={index[1]}>
                <div className="preview-default-page-img-vertical" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </React.Fragment>))
    }
    if (index[1] && img[1] && orientation[1] === 'horizontal') {
        imagesArr.push((
            <React.Fragment key={index[1]}>
                <div className="preview-default-page-img" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </React.Fragment>))
    }
    return (
        <div className="preview-default-page">
            <div className="preview-default-page-number">{number}</div>
            {imagesArr}
            <div className="preview-default-page-executor">{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewDefaultPage;