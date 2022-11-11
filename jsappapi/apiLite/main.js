// apiLite beta version 0.3

// If the document is loaded run the function ready()
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        ready();
    }
  };

//   The ready() function
function ready() {
    document.getElementsByTagName("HEAD")[0].innerHTML += "<link rel='stylesheet' href='/jsappapi/apiLite/theme.css'>";
    if (typeof appname == 'undefined') {
        appname = "apiLite App"
    }
    document.getElementById("header").innerText = appname;
    document.title = appname;
    loadTheme("custom");
    console.log("ready!")
}

// Converts dialog functions to alerts
function dialog(a) {
    alert(a);
}

// Opens an app
function openApp(appName) {
    location.pathname="/" + appName + "/";
}

// Tab Stealth
function setStealth(title, icon) {
    document.title = title;
    console.log("set title to: '" + title + "' and icon to: '" + icon + "'")
}

// apiLite object
var apiLite = {
    version: "0.3",
    type: "Beta",
    build: 210604,
    theme: localStorage.theme,
    launcher:"./"
};
    apiLite.versionFull = "apiLite " + apiLite.version + " " + apiLite.type + ", build " + apiLite.build;

// projectJS compatibility
const projectJS=apiLite;

// Theme stuff
function loadTheme(theme) {
    if (document.getElementById("customTheme")) {
        document.getElementById("customTheme").remove();
    }
    switch(theme) {
        case "light":
            break;
        case "custom":
            if (localStorage.theme=="custom"&localStorage.customThemeCSS!=="") {
                document.getElementsByTagName("HEAD")[0].innerHTML += "<style id='customTheme'>" + localStorage.customThemeCSS + "</style>";
            }
            break;
        default:
            error("warn", "loadTheme", "not supported!")
    }
}

// Theme compatibility
// Sets a theme
function setTheme(theme) {
    localStorage.theme = theme;
    apiLite.theme = theme;
}

// Sets an interface
function setInterface(name) {
    localStorage.interface = name;
    apiLite.interface = name;
}

function error(type,func,desc) {
    switch(type) {
        case "error":
            console.error("Error in function: '" + func + "', desciption: '" + desc + "'")
        break;
        case "warn":
            console.warn("Warning in function: '" + func + "', desciption: '" + desc + "'")
        break;
        default:
            console.error("Error in function: '" + func + "', desciption: '" + desc + "'")
    }
    
}

const apiLiteResizeTo = window.resizeTo;
resizeApp = function(x,y) {
    // var resizeToConfirm = confirm("This app tried to resize itself to " + x + "x" + y + "\n Press OK to allow or press cancel to deny.");
    // if (resizeToConfirm == true) {
        // apiLiteResizeTo(x,y);
    // }
    return true;
}

// Gets app Parameters
function getAppParams() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getAppParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getAppParams()[parameter];
        }
    return urlparameter;
}

// Wallpaper Placeholder
function createWallpaper(x) {
    return x
}

function deleteWallpaper(x) {
    return x
}

// Changes the title of the current App
function setAppName(name) {
    $("#header").text(name);
    if (localStorage.hideTab!=="true") {
        document.title=name
    }
}

// Downloads a string as a file
function downloadAsFile(fileName, content) {
    let element = document.createElement('a');
    element.href = 'data:application/octet-stream;base64,' + btoa(content);
    element.target = '_blank';
    element.download = fileName;
    element.click();
}

// Random Number Generator
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}