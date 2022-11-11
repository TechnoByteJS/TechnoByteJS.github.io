// Project JS Calculator App
var display
$(document).ready(function(){ 
    display = document.getElementById('display');
});

const π = 3.14592;
var lastresult = 0;
var dispInit = true;

function calculate(operation) {
    let result;
    try {
      result = eval(operation);  
    } catch (error) {}
  
    if ( result === 0 || isFinite(result) && Boolean(result) ) {
      document.getElementById('display').innerText = result;
      lastresult = result;
    } else {
      document.getElementById('display').innerText = 'Error';
    }
    dispInit = true;
}

function addChar(character) {
    if(dispInit==true) {
        display.innerText=character;
    } else {
        display.innerText+=character;
    }
    dispInit = false;
}

function backspace() {
  if (display.innerText.length>1&&dispInit==false) {
    display.innerText=display.innerText.slice(0,-1);
  } else {
    AC()
  }
}

function AC() {
  display.innerText='0';
  dispInit = true;
}