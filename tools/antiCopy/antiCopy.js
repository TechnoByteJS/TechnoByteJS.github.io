// Experimental JavaScript copy protection library version 1.0

// Shortcut.js
shortcut={all_shortcuts:{},add:function(l,p,i){var e={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(i)for(var t in e)void 0===i[t]&&(i[t]=e[t]);else i=e;var a=i.target;"string"==typeof i.target&&(a=document.getElementById(i.target));l=l.toLowerCase();function r(e){var t;if(e=e||window.event,!i.disable_in_input||(e.target?t=e.target:e.srcElement&&(t=e.srcElement),3==t.nodeType&&(t=t.parentNode),"INPUT"!=t.tagName&&"TEXTAREA"!=t.tagName)){e.keyCode?code=e.keyCode:e.which&&(code=e.which);var a=String.fromCharCode(code).toLowerCase();188==code&&(a=","),190==code&&(a=".");var r=l.split("+"),n=0,s={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},o={esc:27,escape:27,tab:9,space:32,return:13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,break:19,insert:45,home:36,delete:46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},d={shift:{wanted:!1,pressed:!1},ctrl:{wanted:!1,pressed:!1},alt:{wanted:!1,pressed:!1},meta:{wanted:!1,pressed:!1}};e.ctrlKey&&(d.ctrl.pressed=!0),e.shiftKey&&(d.shift.pressed=!0),e.altKey&&(d.alt.pressed=!0),e.metaKey&&(d.meta.pressed=!0);for(var c=0;k=r[c],c<r.length;c++)"ctrl"==k||"control"==k?(n++,d.ctrl.wanted=!0):"shift"==k?(n++,d.shift.wanted=!0):"alt"==k?(n++,d.alt.wanted=!0):"meta"==k?(n++,d.meta.wanted=!0):1<k.length?o[k]==code&&n++:i.keycode?i.keycode==code&&n++:(a==k||s[a]&&e.shiftKey&&(a=s[a])==k)&&n++;return n!=r.length||d.ctrl.pressed!=d.ctrl.wanted||d.shift.pressed!=d.shift.wanted||d.alt.pressed!=d.alt.wanted||d.meta.pressed!=d.meta.wanted||(p(e),i.propagate)?void 0:(e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation&&(e.stopPropagation(),e.preventDefault()),!1)}}this.all_shortcuts[l]={callback:r,target:a,event:i.type},a.addEventListener?a.addEventListener(i.type,r,!1):a.attachEvent?a.attachEvent("on"+i.type,r):a["on"+i.type]=r},remove:function(e){e=e.toLowerCase();var t,a=this.all_shortcuts[e];delete this.all_shortcuts[e],a&&(t=a.event,e=a.target,a=a.callback,e.detachEvent?e.detachEvent("on"+t,a):e.removeEventListener?e.removeEventListener(t,a,!1):e["on"+t]=!1)}};

const antiCopy = {
    // Refreshes page if has been tempered with
    checkTamper: function() {
        if(document.getElementById("copyShield")==null) {
            location.reload()
        }
        if(document.body.contentEditable=='true') {
            location.reload()
        }
        if(document.getElementsByTagName("html")[0].style.userSelect!=="none"||document.getElementsByTagName("html")[0].style.pointerEvents!=="none") {
            location.reload()
        }
    },
    init: function() {
        // Disable context menu
        document.addEventListener('contextmenu', event => event.preventDefault());
            
        // Disable selection
        document.getElementsByTagName("html")[0].style.pointerEvents = "none";
        document.getElementsByTagName("html")[0].style.userSelect = "none";

        // Disable shortcuts
        shortcut.add("Ctrl+c", function (){});
        shortcut.add("Ctrl+x", function (){});
        shortcut.add("Ctrl+s", function (){});
        shortcut.add("Ctrl+u", function (){});
        shortcut.add("Ctrl+Shift+i", function (){});
              
        // creates screenshot of page and deletes page content, then covers page with screenshot
        const screenshotTarget = document.body;
        if(typeof html2canvas!=='undefined') {
            html2canvas(screenshotTarget).then((canvas) => {
                const base64image = canvas.toDataURL("image/png");
                document.body.innerHTML="";
                document.body.innerHTML+=`<img src='${base64image}' id='copyShield' style="position:fixed;top:-1px;bottom:0;left:0;right:0;z-index:99999;overflow:hidden">`;
                document.body.innerHTML+=`<style>html,body{overflow:hidden}</style>`;
            });
        } else {
            // if no html2canvas
            document.body.innerHTML+=`<div id='copyShield' style="position:fixed;top:0;bottom:0;left:0;right:0;z-index:99999;background:transparent;overflow:hidden"></div>`;
        }
        setInterval(function() {
            antiCopy.checkTamper()
        }, 250);
    }
}

// Initializes copy protection
window.onload = function() {
    antiCopy.init();
};
