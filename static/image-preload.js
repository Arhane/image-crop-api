(function () {
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            imagePreview.src = fileReader.result;
        };
        fileReader.readAsDataURL(file);
    });
})();
