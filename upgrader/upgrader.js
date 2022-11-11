// Upgrades JS localStorage
if (!localStorage.launcher) {
    localStorage.launcher = "appcenter";
}

if(localStorage.getItem("EncryptPadcontents")!==null) {
    localStorage.encryptPadContent=localStorage.EncryptPadcontents;
    localStorage.removeItem("EncryptPadcontents");
}
if(localStorage.getItem("laucher")!==null) {
    localStorage.launcher=localStorage.laucher;
    localStorage.removeItem("laucher");
}

if(localStorage.getItem("loadingScreen")==null) {
    localStorage.loadingScreen="true"
}

if(!localStorage.interface) {
    localStorage.interface= "material";
}
setTimeout(
    function(){
        location.pathname="/appcenter/";
    }
    , 500);