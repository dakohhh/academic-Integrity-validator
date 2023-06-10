
export function assigmentComponent(){
    const divElement = document.createElement("div");
    divElement.className = "assigment text-center go-down-md";

    const innerDivElement = document.createElement("div");

    const assignmentNameDiv = document.createElement("div");
    assignmentNameDiv.className = "font-weight-lg";
    assignmentNameDiv.textContent = "ASSIGMENT 3.docx";

    const documentTypeDiv = document.createElement("div");
    documentTypeDiv.className = "font-size-sm";
    documentTypeDiv.textContent = "Word document";

    innerDivElement.appendChild(assignmentNameDiv);
    innerDivElement.appendChild(documentTypeDiv);

    divElement.appendChild(innerDivElement);

    return divElement
}