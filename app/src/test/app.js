const inputFile = document.querySelector('.input-file');
const img = document.querySelector('.img');
const input = document.querySelector('.file');

// let reader = new FileReader();

inputFile.addEventListener('click', () => {
    input.click();
});
input.addEventListener('change', () => {
    // const formData = new FormData();
    // const imagedata = input.files[0];
    // formData.append('inputname', imagedata);

    // reader.readAsDataURL(input.files[0]);
    // reader.onloadend = function () {
    //     img.src = new URL.createObjectURL(reader.result);
    // };

    img.src = URL.createObjectURL(input.files[0]);
    img.height = 200;
    img.onload = function () {
        URL.revokeObjectURL(this.src);
    }
});