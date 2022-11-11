function updateloadingScreen() {
    var checkValue = document.getElementById("loadingScreen").checked;
    if(checkValue==true) {
        localStorage.loadingScreen="false";
    } else {
        localStorage.loadingScreen="true";
    }
}
function updatehideTab() {
    var checkValue = document.getElementById("hideTabCB").checked;
    if(checkValue==true) {
        localStorage.hideTab="true";
    } else {
        localStorage.hideTab="false";
    }
}

function updateforceWallpaper() {
    var checkValue = document.getElementById("forceWallpaper").checked;
    if(checkValue==true) {
        localStorage.forceWallpaper="true";
        createWallpaper(localStorage.wallpaper)
    } else {
        localStorage.forceWallpaper="false";
        deleteWallpaper()
    }
}

function settingsInit() {
    switch(projectJS.theme) {
        case "light":
            document.getElementById("themeSelect").selectedIndex = "1";
            break;
        case "dark":
            document.getElementById("themeSelect").selectedIndex = "0";
            break;
        case "midnight":
            document.getElementById("themeSelect").selectedIndex = "2";
            break;
        case "custom":
            document.getElementById("themeSelect").selectedIndex = "3";
            break;
    }
    switch(projectJS.interface) {
        case "material":
            document.getElementById("interfaceSelect").selectedIndex = "1";
            break;
        case "luna":
            document.getElementById("interfaceSelect").selectedIndex = "0";
            break;
        case "classic":
            document.getElementById("interfaceSelect").selectedIndex = "2";
            break;
    }
    switch(localStorage.hideTab) {
        case "true":
            document.getElementById("hideTabCB").checked = true;
            break;
        case "false":
            document.getElementById("hideTabCB").checked = false;
            break;
    }
    switch(localStorage.loadingScreen) {
        case "true":
            document.getElementById("loadingScreen").checked = false;
            break;
        case "false":
            document.getElementById("loadingScreen").checked = true;
            break;
    }
    switch(localStorage.forceWallpaper) {
        case "true":
            document.getElementById("forceWallpaper").checked = true;
            break;
        case "false":
            document.getElementById("forceWallpaper").checked = false;
            break;
    }
    updateWallpaper()
}

function updateWallpaper() {
    if (localStorage.getItem("wallpaperName")!==null) {
        $("#wallpaperName").text("Current Wallpaper: " + localStorage.wallpaperName);
    } else {
        $("#wallpaperName").text("Current Wallpaper: None");
    }
}

function updateTheme() {
    if (localStorage.interface!==document.getElementById("interfaceSelect").value) {
        setInterface(document.getElementById("interfaceSelect").value);
    }
    if (localStorage.theme!==document.getElementById("themeSelect").value) {
        setTheme(document.getElementById("themeSelect").value);
    }
}

function importTheme() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.css';

    input.onchange = e => { 
   var file = e.target.files[0]; 

   var reader = new FileReader();
   reader.readAsText(file,'UTF-8');

   reader.onload = readerEvent => {
      var content = readerEvent.target.result;
      if (content.includes("<script")||content.includes("</script>")) {
        dialog("This theme may contain dangerous code.", "warn")
    }
    //   content = content.replace(/</g, "_").replace(/>/g, "_");
      localStorage.customThemeCSS = content;
      setTheme("custom");
      document.getElementById("themeSelect").selectedIndex = "2";
   }

}
    input.click();
}

function importWallpaper() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.gif,.svg';

    input.onchange = e => { 
   var file = e.target.files[0]; 

   var reader = new FileReader();
   reader.readAsDataURL(file);
   localStorage.wallpaperName = file.name;

   reader.onloadend = readerEvent => {
      var content = readerEvent.target.result;
      try {
        localStorage.setItem("wallpaper",content);
      }
      catch(err) {
        dialog(err.message,"error");
        clearWallpaper()
      }
      updateWallpaper()
   }

}
    input.click();
}

function clearWallpaper() {
    localStorage.removeItem("wallpaper");
    localStorage.removeItem("wallpaperName");
    updateWallpaper();
    deleteWallpaper()
}

function restoreWallpaper() {
    localStorage.wallpaperName = defaultWallpaperName;
    localStorage.wallpaper = defaultWallpaper;
    updateWallpaper()
}

function resetAll() {
    var resetAlld = confirm("Are you sure? This can't be undone.");
    if (resetAlld == true) {
        localStorage.clear();
        document.write("All data has been successfully deleted.")
    }
}