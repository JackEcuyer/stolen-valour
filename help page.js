//This script is for a help page the player can access if they need to familiarise themselves with basic commands they can input

function helpMenu(){
  textbox.innerHTML = " "; // clears the console
  outputText("- Help Page -");
  outputText("Basic Commands:");
  outputText("Movement - You can use 'north', 'south', 'east', and 'west' to navigate around the map.");
  outputText("Type 'inventory' to see the contents of your inventory.")
  outputText("You can use 'examine' to look closer at an object.")
  outputText("You can use 'clear' to clear the console.");
  outputText("You can use 'look' to re-display the description of your current location."); 
  outputText("You can use 'take' to pickup an object.");
  outputText("You can use 'use' to use an item.");
  outputText("You can use 'craft' to make an item from the materials in your inventory.");
  outputText("You can increase your score by making progression in the game.")
  outputText("If you for some reason experience a glitch or bug, please type 'restartgame' to play from the beginning.");
  }