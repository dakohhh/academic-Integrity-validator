import { assigmentComponent } from "./components.js";

import { getCSRFTokenFromCookie } from "./csrf.js";


const assignmentField = document.getElementById("assigment-field")




const addAssginmentButton = document.getElementById("add-assignment-btn");

let eventListenerAdded = false;

addAssginmentButton.addEventListener("click", async ()=>{

    const fileInput = document.getElementById('file-upload');


    if (fileInput.files.length > 0) {
        fileInput.value = '';

        addAssginmentButton.classList.add('fade-out');
        setTimeout(function() {
            addAssginmentButton.innerHTML = '<i class="fa-solid fa-plus"></i> &nbsp;Add assignment';
            addAssginmentButton.classList.remove('fade-out');
            assignmentField.innerHTML = ""

        }, 500);


        addAssginmentButton.classList.remove('prm-color-red');
        addAssginmentButton.classList.add('prm-color');

    } 
      
    else {

        fileInput.click();

    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        // Process the uploaded file
        console.log('Selected file:', file);

        if (file) {
          // File is successfully uploaded
            if (!assignmentField.querySelector('.assigment')) {
                addAssginmentButton.classList.add('fade-out');
                setTimeout(function() {
                    addAssginmentButton.classList.remove('fade-out');
                    addAssginmentButton.innerHTML = '<i class="fa-solid fa-minus"></i> &nbsp;Remove assignment';

                    console.log(file)
        
                    const assignmentComponent = assigmentComponent(file.name, file.type); // Create the assignment component
                    assignmentField.appendChild(assignmentComponent);
        
                }, 500);
        
                addAssginmentButton.classList.remove('prm-color');
                addAssginmentButton.classList.add('prm-color-red');
            }

            // Remove the event listener to prevent multiple components from being added
            fileInput.removeEventListener('change', handleFileChange);
            eventListenerAdded = false
        }
    }

    if (!eventListenerAdded) {
        fileInput.addEventListener('change', handleFileChange);

        eventListenerAdded = true; 
    }


})





const turnInButton = document.getElementById("turn-in")

turnInButton.addEventListener("click", async ()=>{

    const assignmentUpload = document.getElementById('file-upload');


    console.log(assignmentUpload.files)




})



