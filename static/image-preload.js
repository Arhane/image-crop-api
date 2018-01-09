(function () {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const imagePreview = document.getElementById('image-preview');
        const fileReader = new FileReader();
        fileReader.onload = () => {
            imagePreview.src = fileReader.result;
        };
        fileReader.readAsDataURL(file);
    });
})();
