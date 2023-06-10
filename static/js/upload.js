

function uploadFile() {
    const fileInput = document.getElementById('file-upload');

    if (fileInput.files.length > 0) {
      // A file is already selected, remove it
      fileInput.value = '';
    }


    fileInput.click();

    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      // Process the uploaded file
      console.log('Selected file:', file);

      console.log("Files Length", fileInput.files.length)
      // Additional code to handle the uploaded file
    });
  }