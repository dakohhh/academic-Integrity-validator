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

    const response = await submitAssignment(file)

    const is_plagiarized = response.data.is_plagiarized

    console.log(is_plagiarized)

    const successModal = new bootstrap.Modal(document.getElementById('staticBackdrop2'));



    if (response.success === true && is_plagiarized === false){



        successModal.show()

        const plag_suc_or_fail_img = document.getElementById("plag_suc_or_fail_img")

        const plag_success_fail_info = document.getElementById("plag_success_fail_info")


        const plag_success_fail_message = document.getElementById("plag_success_fail_message")


        plag_success_fail_info.textContent = "Success!"

        plag_success_fail_message.textContent = "Your work has been analysed and  approved for submission onlknlk";

        plag_suc_or_fail_img.src = "/static/img/check.png"


    }

    // else if (result.success === false && result.data === "00"){

    //     pay_modal.classList.remove('show')
    //     pay_modal.style.display = 'none'
    //     pay_modal.setAttribute('aria-hidden', 'true');

    //     successModal.classList.add('fade');

    //     setTimeout(function() {
    //         successModal.classList.add('show');
    //     }, 100);

    //     successModal.style.display = 'block';
    //     successModal.setAttribute('aria-hidden', 'false');

    //     const pay_suc_or_fail_img = document.getElementById("pay_suc_or_fail_img")

    //     const pay_success_fail_info = document.getElementById("pay-success-fail-info")

    //     const pay_success_fail_message = document.getElementById("pay-success-fail-message")

    //     const redirect_msg = document.getElementById("redirect-msg")


    //     pay_success_fail_info.textContent = "Transaction Failed"

    //     pay_success_fail_message.textContent = result.message

    //     pay_suc_or_fail_img.src = "/static/img/x-mark.png"

    //     payRedirectToDashboard(redirect_msg);
    

        
    // }





})



