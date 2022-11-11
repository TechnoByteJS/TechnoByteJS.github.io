// Set Variables
var plays = 0;
var diff = 6;

// Roulette Game
function roulette() {
  plays++;
  var roulette = Math.floor((Math.random() * diff) + 1);
  // If you lose
  if (roulette == 1) {
    // Attempts to crash your browser when you lose.
      while (true) {
        document.title = Math.floor(Math.random() * (99999999999999999 - 11111111111111111) + 11111111111111111);
      }
        
}
// If you win
else {
   document.getElementById('1').innerHTML = 'Status: You Won!';
   document.getElementById('2').innerHTML = 'Times Played: '+ plays;
 }
}

// Set the difficulty
function setdiff(diff) {
  switch(diff) {
    case 12:
      document.getElementById('3').innerHTML = 'Difficulty: Easy';
      document.getElementById('4').innerHTML = 'Win chance: 91.7%';
      break;
    case 6:
      document.getElementById('3').innerHTML = 'Difficulty: Normal';
      document.getElementById('4').innerHTML = 'Win chance: 83.3%';
      break;
    case 3:
      document.getElementById('3').innerHTML = 'Difficulty: Hard';
      document.getElementById('4').innerHTML = 'Win chance: 66.6%';
      break;
    case 2:
      document.getElementById('3').innerHTML = 'Difficulty: Ultra';
      document.getElementById('4').innerHTML = 'Win chance: 50.0%';
      break;
    default:
      // code block
  }

}
