import React from 'react';
import PreviewPage from '../components/main/PreviewPage';

export default class PreviewPageItem {
    type
    parity
    pageNumber
    img1
    img2
    img3
    img4

    galleryImages
    setGalleryImages
    photoTableData
    settings
    setModalProperties
    currentGalleryImage
    setCurrentGalleryImage
    previewPageScale

    constructor(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale) {
        this.galleryImages = galleryImages
        this.setGalleryImages = setGalleryImages
        this.photoTableData = photoTableData
        this.settings = settings
        this.setModalProperties = setModalProperties
        this.currentGalleryImage = currentGalleryImage
        this.setCurrentGalleryImage = setCurrentGalleryImage
        this.previewPageScale = previewPageScale

    }
    getImg3() {
        return this.img3
    }
    setType(value) {
        this.type = value
    }
    setParity(value) {
        this.parity = value
    }
    setPageNumber(value) {
        this.pageNumber = value
    }
    setImg1(value) {
        this.img1 = value
    }
    setImg2(value) {
        this.img2 = value
    }
    setImg3(value) {
        this.img3 = value
    }
    setImg4(value) {
        this.img4 = value
    }
    assemblePage() {
        return (
            <PreviewPage
                key={this.pageNumber}
                type={this.type}
                parity={this.parity}
                pageNumber={this.pageNumber}
                img1={this.img1}
                img2={this.img2}
                img3={this.img3}
                img4={this.img4}
                galleryImages={this.galleryImages}
                setGalleryImages={this.setGalleryImages}
                photoTableData={this.photoTableData}
                settings={this.settings}
                setModalProperties={this.setModalProperties}
                currentGalleryImage={this.currentGalleryImage}
                setCurrentGalleryImage={this.setCurrentGalleryImage}
                previewPageScale={this.previewPageScale}
            />
        )
    }
}