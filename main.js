let currentPos, currentRoom;

var scoreBox;

var moveCountBox; // the moves count box on the html page

let playerInventory = []; // the variable where all objects the player has acquired are stored.

let playerClothes = false; // the variable that will state if the player is wearing army clothes or not.

let moveCount = 0 // the variable that stores the amount of moves the player has made at certain points in the game. Will reset to 0 at certain events.

let totalMoveCount = 0 // the variable that stores the amount of moves overall that the player has made.

let playerScore = 0 // the variable that stores the players score in the game. Will change as the player makes progress.

const MAPWIDTH = 2

/* This function will wait for the input of the user and 
parse the contents of the input so that the command can 
be processed and executed */
function checkInput(e) {
  if (e.key == 'Enter') { // the enter key will send the contents to the parser
    command = cli.textContent; // use the typed command
    outputText(">> " + command);
    cli.innerHTML = "" // clears the text input box
    totalMoveCount += 1; // adds 1 to the overall moves in the game.

    moveCountBox.innerHTML = "Move Count:" + totalMoveCount // updates the move count displayed on the HTML page.
    
    moveCount += 1 // adds 1 to the moveCount as the player has made a move.
    parser(command); // sends the input to the parser
    e.preventDefault(); // stops the listening event

    scoreBox.innerHTML = "Current Score:" + playerScore; // updates the score displayed on the page

    if (currentRoom[currentPos].name == upRooms[3].name) { // checks if the player has entered into the clothing room for the first time and if so initiates the clothing room fight event.
      clothingRoomFight(currentRoom[currentPos]);
    }
  }
}

/* This function will interpret the command the user
has input and execute something depending on the input */
function parser(cmd) {
  let commandWords = cmd.trim().toUpperCase().split(" "); // formats the command and splits the command into an array for management of multiple word commands.
  switch (commandWords.length) {
    case 1: // single word commands
      switch (commandWords[0]) {

        /*these NSEW cases check whether the movement commands moved the player into a different room and if so outputs the description of the room that the player has entered.*/

        case "NORTH":
        case "N": //command for going north
          if (goNorth(currentRoom[currentPos]) == true) {
            descCheck(currentRoom[currentPos]);
          }

          break;

        case "SOUTH":
        case "S": // command for going south
          if (goSouth(currentRoom[currentPos]) == true) {
            descCheck(currentRoom[currentPos]);
          }
          if (currentRoom[currentPos].name == upRooms[3].name) { // checks if the room is the clothing room and if so resets the moveCount so that the clothingRoomFight can occur.
            moveCount = 0
          }
          break;

        case "EAST":
        case "E": // command for going east
          if (goEast(currentRoom[currentPos]) == true) {
            descCheck(currentRoom[currentPos]);
          }
          break;

        case "WEST":
        case "W": // command for going west
          if (goWest(currentRoom[currentPos]) == true) {
            descCheck(currentRoom[currentPos]);
          }
          if (currentRoom[currentPos].name == upRooms[3].name) { // checks if the room is the clothing room and if so resets the moveCount so that the clothingRoomFight can occur.
            moveCount = 0
          }
          break;

        case "HELP":  //command for displaying the help menu
          helpMenu();
          break;

        case "CLEAR": // command for clearing the console
          clearConsole();
          break;

        case "LOOK": // command for looking around current room
          lookAround(currentRoom[currentPos]);
          break;

        case "INVENTORY": // command for showing the players current inventory items
          showInventory(playerInventory);
          break;
        
        case "RESTARTGAME":
        case "RESTART": // command for restarting the game.
          playerDeath();
          break;

        case "DOWN": // command for going downstairs.
          goDown(currentRoom[currentPos]);
          descCheck(currentRoom[currentPos]);
          break;

        //other 1 word commands after here


        // the cases below are for 2 word commands that have only been entered as 1.
        case "EXAMINE": outputText("Please specify what you would like to examine.");
          break;
        case "HIT": outputText("Please specify what you would like to hit.");
          break;
        case "RELOAD": outputText("Please specify what weapon you would like to reload.")
          break;
        case "CRAFT":
        case "MAKE": outputText("Please specify what you would like to craft.");
          break;
        case "TAKE":
        case "PICKUP": outputText("Please specify what you would like to pickup.");
          break;
        case "DROP": outputText("Please specify what you would like to drop.");
          break;
        case "UNLOCK": outputText("Please specify what you would like to unlock.");
          break;

      }
      break;

    case 2: // 2 word commands
      switch (true) {
        case (commandWords[0] == "EXAMINE"):
        case (commandWords[0] == "INSPECT"): // command for examining an object
          examineObject(commandWords[1],//the object the user input to examine
            currentRoom[currentPos], playerInventory);
          break;

        case (commandWords[0] == "TAKE"):
        case (commandWords[0] == "PICKUP"): // command for a player picking up an object from the room
          takeObject(currentRoom[currentPos], commandWords[1], playerInventory);
          break;

        case (commandWords[0] == "DROP"): //command for dropping an item from the players inventory
          dropObject(currentRoom[currentPos], commandWords[1], playerInventory);
          break;

        case (commandWords[0] == "USE"): // command for using an item
          switch (commandWords[1]) {
            case "KEY": unlockPrisonDoor(currentRoom[currentPos], playerInventory);
              break;
            case "C4": explodeGuardRoomWall(currentRoom[currentPos], playerInventory);
              break;
            case "FLASHLIGHT": flashlightOn(currentRoom[currentPos], playerInventory);
              break;
            case "CLOTHES": wearClothes(playerInventory,playerClothes);
              break;
            case "SCREWDRIVER": openHatch(currentRoom[currentPos],playerInventory);
              break;
          }
          break;

        case (commandWords[0] == "HIT"): //command for attacking a guard with fists
          switch (commandWords[1]) {
            case "GUARD": hitGuard(currentRoom[currentPos]); break;
          }
          break;

        case (commandWords[0] == "RELOAD"):
          switch (true) {
            case (commandWords[1] == "PISTOL"):
              reloadPistol(playerInventory);// command for reloading a weapon
              break;
            case(!commandWords[1] == "PISTOL"):
              outputText("You dont have that weapon.");
              break;
          }
          break;

        case(commandWords[0] == "CRAFT"):
        case(commandWords[0] == "MAKE"): // command for player crafting a new item.
          craftObject(playerInventory,commandWords[1]);
          break;
        
        case(commandWords[0] == "UNLOCK"): //alternate command for unlocking prison door.
          if(commandWords[1] == "DOOR"){
            unlockPrisonDoor(currentRoom[currentPos], playerInventory);
          }
          break;
          
      }
  }
}

function initGame() {

  totalMoveCount = 0 //resets the total move count
  moveCount = 0 // resets event based move count
  playerScore = 0 // resets the players score

  scoreBox = document.getElementById('score-box');
  //  locates the HTML for score to be displayed.
  scoreBox.innerHTML = "Current Score:" + playerScore;

  moveCountBox = document.getElementById('movecount-box') //locates the HTML for move count to be displayed
  moveCountBox.innerHTML = "Move Count:" + totalMoveCount;  
  clearConsole(); // resets the console
  
  initObjects(); // initialises the original states of objects
  initRooms(); // initialises the original states of rooms
  playerInventory = []; // resets the playerInventory
  currentPos = 0; // setting up the room for the players spawn
  currentRoom = upRooms; // linking the current room variable to the array of upstairs rooms in rooms.js
  playerClothes = false; // resets players clothes status.

  outputText("-- STOLEN VALOUR --");
  outputText("A text adventure game by Jack Ecuyer");
  outputText("Type 'help' to see a list of basic commands.")
  textSplitter(currentRoom[currentPos].firstDesc); 

}
function outputText(txt) {
  var newPara = document.createElement("p");
  newPara.appendChild(document.createTextNode(txt));
  textbox.appendChild(newPara);
  newPara.scrollIntoView();
}

