
export function assigmentComponent(file_name, file_type){
    const divElement = document.createElement("div");
    divElement.className = "assigment text-center go-down-md";

    const innerDivElement = document.createElement("div");

    const assignmentNameDiv = document.createElement("div");
    assignmentNameDiv.className = "font-weight-lg";
    assignmentNameDiv.textContent = file_name;

    const documentTypeDiv = document.createElement("div");
    documentTypeDiv.className = "font-size-sm";
    documentTypeDiv.textContent = file_type;

    innerDivElement.appendChild(assignmentNameDiv);
    innerDivElement.appendChild(documentTypeDiv);

    divElement.appendChild(innerDivElement);

    return divElement
}