// Check if there is any stored content
if(localStorage.encryptPadContent) {
  document.getElementById("encryptTextLabel").innerHTML = "Status: Encrypted content found.";
}
// Delete all objects
function secureDelete() {
  delete ENpassw;
  delete DEpassw;
  delete encryptThis;
  delete decrypted;
}

// Encrypt text area contents
function encryptContents() {
  ENpassw = document.getElementById("ENpassw").value;
  if(ENpassw.length>7){
    encryptThis = document.getElementById("text").value;
    if(encryptThis.length<1){
      document.getElementById("encryptTextLabel").innerHTML = "Status: Text field cannot be empty!";
    } else {
      localStorage.encryptPadContent = CryptoJS.AES.encrypt(encryptThis, ENpassw);
      document.getElementById("ENpassw").value = "";
      document.getElementById("text").value = "";
      secureDelete();
      document.getElementById("encryptTextLabel").innerHTML = "Status: Successfully Encrypted text!";
    }
    
  } else {
    document.getElementById("encryptTextLabel").innerHTML = "Status: Password must be at least 8 characters long.";
  }
  
}
// Decrypt text area contents
function decryptContents() {
  DEpassw = document.getElementById("DEpassw").value;
  decrypted = CryptoJS.AES.decrypt(localStorage.encryptPadContent, DEpassw);
  if(decrypted.toString(CryptoJS.enc.Utf8)=="") {
    document.getElementById("encryptTextLabel").innerHTML = "Status: Wrong Password!";
  } else {
    document.getElementById("text").value = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById("encryptTextLabel").innerHTML = "Status: Successfully Decrypted text!";
  }
  document.getElementById("DEpassw").value = "";
  secureDelete();
}

// Delete all content
function deleteContents() {
  localStorage.removeItem("encryptPadContent");
  document.getElementById("ENpassw").value = "";
  document.getElementById("DEpassw").value = "";
  document.getElementById("text").value = "";
  secureDelete();
  document.getElementById("encryptTextLabel").innerHTML = "Status: Successfully deleted all content!";
}