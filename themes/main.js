function installTheme(css) {
    localStorage.customThemeCSS = css;
    setTheme("custom")
}
function resetTheme() {
    setTheme("dark");
}

function saveTheme() {
    if(projectJS.theme=="custom"&&localStorage.customThemeCSS) {
        downloadAsFile("theme.css", localStorage.customThemeCSS)
    } else {
        dialog("Install a theme first!")
    }
}