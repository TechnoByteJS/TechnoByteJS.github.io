// SafeEncrypt V4
defaultpass = "e3YkQkg0LzguLiVZLTVFZyEoeX0yek16ZDViRixDJHJyOjNqYSpqcm16d3pLaVtaTjtHYlQ0ViEvWVlYcWhnals7NnBNXThEZE00cTRlWWQ9SlRSWXU2SDhGOFMsLUxQXUM7dFNfNi1CLXBiOFkkZkN2JCVHUT9WQnZpVXl4UFZ9RHVBWVIqUz8jenlxRzorKHsqNz0pJVdQdiFkfSRtSDRML2d2SHVaVnUqZldXTTUvJGdKOlNVTGNkcWIqTlt0OCxCVXdqblAsaXk5RHhXY1d2JU5lZmcmai9SaE53U0BVW0glQytZOyQuJWJwUmdQKSx9NixlSlQ6anh9eCwmJQ==";

// Encrypt with password
function SafeEncryptPass() {
    let encryptThis = document.getElementById("textpass").value;
    let ENpassword = document.getElementById("pass").value;
    let encrypted = CryptoJS.AES.encrypt(encryptThis, ENpassword);
    document.getElementById('ResultPass').innerHTML = encrypted;
    secureDelete();
}

// Decrypt with password
function SafedecryptPass() {
    let decryptThis = document.getElementById("textpass").value;
    let DEpassword = document.getElementById("pass").value;
    let decrypted = CryptoJS.AES.decrypt(decryptThis, DEpassword);  
    document.getElementById('ResultPass').innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
    secureDelete();
}

// Encrypt without password
function SafeEncryptNoPass() {
    let encryptThis = document.getElementById("textnopass").value;
    let encrypted = CryptoJS.AES.encrypt(encryptThis, atob(defaultpass));
    document.getElementById('ResultNoPass').innerHTML = encrypted;
    secureDelete();
}

// Decrypt without password
function SafedecryptNoPass() {
    let decryptThis = document.getElementById("textnopass").value;
    let decrypted = CryptoJS.AES.decrypt(decryptThis, atob(defaultpass));
    document.getElementById('ResultNoPass').innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
    secureDelete();
}
function secureDelete() {
    document.getElementById("textpass").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("textnopass").value = "";
}