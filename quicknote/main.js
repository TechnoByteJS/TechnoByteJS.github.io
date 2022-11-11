// Check if there is any stored content
if(localStorage.quickNoteContent) {
  loadNote();
}

// Save text area contents
function saveNote() {
  localStorage.quickNoteContent = btoa(document.getElementById("text").value);
  
}
// Load text area contents
function loadNote() {
  document.getElementById("text").value = atob(localStorage.quickNoteContent);
}

// Delete all content
function deleteNote() {
  localStorage.removeItem("quickNoteContent");
  document.getElementById("text").value = "";
}