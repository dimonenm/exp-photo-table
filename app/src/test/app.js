const inputFile = document.querySelector('.input-file');
const input = document.querySelector('#file');
inputFile.addEventListener('click', () => {
    input.click();
});
input.addEventListener('onChange', () => {
    console.log(input.files);    
})

function showFile(input) {
    let file = input.files;

    console.log(file);
}