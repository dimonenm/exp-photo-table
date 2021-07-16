const inputFile = document.querySelector('.input-file');
const input = document.querySelector('.file');
inputFile.addEventListener('click', () => {
    input.click();
});
input.addEventListener('change', () => {
    const formData = new FormData();
    const imagedata = input.files[0];
    formData.append('inputname', imagedata);
});
// test5