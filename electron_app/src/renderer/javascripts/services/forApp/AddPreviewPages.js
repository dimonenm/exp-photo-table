import React from "react"
import PreviewPageItem from "../../entities/PreviewPageItem"

function addPreviewPages(arrPreviewPages, galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale) {

    // если фотографий нет
    if (galleryImages.length === 0) {
        const previewPageItem = new PreviewPageItem(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)
        previewPageItem.setType('title')
        previewPageItem.setParity('odd')
        previewPageItem.setPageNumber(1)
        arrPreviewPages.push(previewPageItem.assemblePage())
    } else {
        // если фотографии есть

        let pageNumber = 1

        for (let i = 0; i < galleryImages.length; i++) {

            if (i === 0) {
                // если первая фотография
                const previewPageItemTitle = new PreviewPageItem(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)
                previewPageItemTitle.setType('title')
                previewPageItemTitle.setParity('odd')
                previewPageItemTitle.setPageNumber(pageNumber)
                previewPageItemTitle.setImg1(galleryImages[i])

                arrPreviewPages.push(previewPageItemTitle.assemblePage())
                pageNumber++

                // если первая фотография есть а следующей нет
                if (!galleryImages[i + 1]) {
                    const previewPageItemNew = new PreviewPageItem(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)
                    previewPageItemNew.setType('page')
                    previewPageItemNew.setParity('even')
                    previewPageItemNew.setPageNumber(pageNumber)

                    arrPreviewPages.push(previewPageItemNew.assemblePage())
                    pageNumber++
                }
            } else {
                // если есть вторая и следующие фотографии
                const previewPageItem = new PreviewPageItem(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)
                previewPageItem.setType('page')
                previewPageItem.setParity(pageNumber % 2 === 0 ? 'even' : 'odd')
                previewPageItem.setPageNumber(pageNumber)
                previewPageItem.setImg1(galleryImages[i])

                if (galleryImages[i + 1]) {
                    // если есть следующая фотография

                    if (galleryImages[i]?.getOrientation() === '6X9' && galleryImages[i + 1]?.getOrientation() === '6X9') {
                        previewPageItem.setImg2(galleryImages[i + 1])
                        // прибовляем 1 к итератору
                        i++
                    }

                    previewPageItem.setImg3(galleryImages[i + 1])
                    // прибовляем 1 к итератору
                    i++

                    if (galleryImages[i]?.getOrientation() === '6X9' && galleryImages[i + 1]?.getOrientation() === '6X9') {
                        previewPageItem.setImg4(galleryImages[i + 1])
                        // прибовляем 1 к итератору
                        i++
                    }

                    arrPreviewPages.push(previewPageItem.assemblePage())
                    pageNumber++
                    // если следующей фотографии нет
                    if (!galleryImages[i + 1] && previewPageItem.getImg3()) {
                        const previewPageItemNew = new PreviewPageItem(galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale)
                        previewPageItemNew.setType('page')
                        previewPageItemNew.setParity(pageNumber % 2 === 0 ? 'even' : 'odd')
                        previewPageItemNew.setPageNumber(pageNumber)

                        arrPreviewPages.push(previewPageItemNew.assemblePage())
                        pageNumber++
                    }
                } else {
                    // если следующей фотографии нет
                    arrPreviewPages.push(previewPageItem.assemblePage())
                    pageNumber++
                }
            }
        }
    }
}
export default addPreviewPages