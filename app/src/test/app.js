const inputFile = document.querySelector('.input-file');
const input = document.querySelector('.file');
inputFile.addEventListener('click', () => {
    console.log('test1');
    input.click();
});
input.addEventListener('change', () => {
    console.log('test2');
    console.log(input.files);
    const formData = new FormData();
    console.log('formData: ', formData);
    const imagedata = input.files[0];
    console.log('imagedata: ', imagedata);
    formData.append('inputname', imagedata);
    console.log('formData2: ');
    console.dir(formData);
    console.log('formData3: ');
    console.dir(formData.get('inputname'));
});