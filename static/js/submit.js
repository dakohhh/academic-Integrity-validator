import { assigmentComponent, getFileType } from "./components.js";

import { getCSRFTokenFromCookie } from "./csrf.js";


const assignmentField = document.getElementById("assigment-field")


const turnInButton = document.getElementById("turn-in");


const addAssginmentButton = document.getElementById("add-assignment-btn");


let eventListenerAdded = false;


async function submitAssignment(file) {

    const csrf_token = getCSRFTokenFromCookie();

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("ass", "ass");
    
    const  myHeaders = new Headers();
    myHeaders.append("X-CSRFToken", csrf_token);
    
    const response = await fetch(`/submit`, {
        method: 'POST',
        body: formdata,
        headers: myHeaders,  
        redirect: 'follow'
    });
    
    const result = await response.json();

    return result
}



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

        turnInButton.disabled = true;

    } 
      
    else {

        fileInput.click();

    }

    function handleFileChange(event) {
        const file = event.target.files[0];


        if (file) {

            if (!assignmentField.querySelector('.assigment')) {
                addAssginmentButton.classList.add('fade-out');
                setTimeout(function() {
                    addAssginmentButton.classList.remove('fade-out');
                    addAssginmentButton.innerHTML = '<i class="fa-solid fa-minus"></i> &nbsp;Remove assignment';

        
                    const assignmentComponent = assigmentComponent(file.name, getFileType(file.type)); 
                    assignmentField.appendChild(assignmentComponent);
        
                }, 500);
        
                addAssginmentButton.classList.remove('prm-color');
                addAssginmentButton.classList.add('prm-color-red');
            }

            fileInput.removeEventListener('change', handleFileChange);
            turnInButton.disabled = false;
            eventListenerAdded = false
        }
    }

    if (!eventListenerAdded) {
        fileInput.addEventListener('change', handleFileChange);

        eventListenerAdded = true; 
    }


})






turnInButton.addEventListener("click", async ()=>{

    const assignmentUpload = document.getElementById('file-upload');


    const file = assignmentUpload.files[0]

    console.log(await submitAssignment(file))




})



