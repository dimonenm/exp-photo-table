import React from 'react';

function PreviewDefaultPage({ number, index, img, text, photoTableData, settings, setModalProperties }) {
    const imagesArr = []
    imagesArr.push((
        <>
            <div className='preview-default-page-img' style={{ backgroundImage: `url(${img[0]})` }}></div>
            <div className='preview-default-page-photo-description'><strong>{`Фото № ${index[0]}.`}</strong>{text[0]}</div>
        </>))
    if (index[1] && img[1] && text[1]) {
        imagesArr.push((
            <>
                <div className='preview-default-page-img' style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className='preview-default-page-photo-description'><strong>{`Фото № ${index[1]}.`}</strong>{text[1]}</div>
            </>))
}
    
    return (
        <div className='preview-default-page'>
            <div className='preview-default-page-number'>{number}</div>
            {imagesArr}
            <div className='preview-default-page-executor'>{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewDefaultPage;