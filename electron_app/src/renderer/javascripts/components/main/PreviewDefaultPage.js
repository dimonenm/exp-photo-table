import React from 'react';

function PreviewDefaultPage({ number, index, img, text, photoTableData, settings, setModalProperties }) {
    console.log(img);
    const backgroundImage = {
        backgroundImage: `url(${img})`
    }
    return (
        <div className='preview-default-page'>
            <div className='preview-default-page-number'>{ number}</div>
            <div className='preview-default-page-img' style={backgroundImage}></div>
            <div className='preview-default-page-photo-description'><strong>{`Фото № ${index}.`}</strong>{text}</div>
            <div className='preview-default-page-executor'>{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewDefaultPage;