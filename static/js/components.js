
export function assigmentComponent(file_name, file_type){
    const divElement = document.createElement("div");
    divElement.className = "assigment text-center go-down-md";

    const innerDivElement = document.createElement("div");

    const assignmentNameDiv = document.createElement("div");
    assignmentNameDiv.className = "font-weight-lg";
    assignmentNameDiv.textContent = truncateFileName(file_name, 23);

    const documentTypeDiv = document.createElement("div");
    documentTypeDiv.className = "font-size-sm";
    documentTypeDiv.textContent = file_type;

    innerDivElement.appendChild(assignmentNameDiv);
    innerDivElement.appendChild(documentTypeDiv);

    divElement.appendChild(innerDivElement);

    return divElement
}



export function getFileType(fileType) {
    if (fileType.startsWith('image/')) {
      return 'Image';
    } else if (fileType === 'application/pdf') {
      return 'PDF';
    } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'Word document';
    } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return 'Excel spreadsheet';
    } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      return 'PowerPoint presentation';
    } else {
      return 'File';
    }
}




export function truncateFileName(fileName, maxLength) {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength - 3) + "...";
    } else {
      return fileName;
    }
}
  
  
  
  
  
  
  