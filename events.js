// This script handles all in game events that the player can trigger by using items, attacking NPCs, etc.

//event for the death of the player //NOT WORKING
// used in initGame()
function playerDeath() {
  outputText("YOU DIED! " + "Your final score was *" + playerScore + "* restarting game in 5 secs..");
  setTimeout(initGame, 5000) // restarts the game after waiting for 5 seconds.
}

//event for unlocking prison door
function unlockPrisonDoor(currentRoom, playerInventory) {
  if (currentRoom.name == upRooms[0].name && playerInventory.includes("key")) { // checks if player is in prison rooms and if they have the key to the door
    upRooms[0].access.push("S"); // allows the player to leave the room
    playerInventory.splice(playerInventory.indexOf("key"), 1); // removes the key from the players inventory
    outputText("The south prison door has been unlocked!")
    playerScore += 5;
  }
  else if (currentRoom.name != upRooms.name) {
    outputText("You can't do that here.");
  }

  else if (!playerInventory.includes("key")) {
    outputText("You don't have the key!");
  }
}

//event for exploding wall *into guard room*
function explodeGuardRoomWall(currentRoom, playerInventory) {
  if (currentRoom.name == upRooms[1].name && playerInventory.includes("c4")) { // checks that player is in the room west of the guard room and has c4.
    upRooms[1].access.push("E"); // allows the player to enter the guard room east
    playerInventory.splice(playerInventory.indexOf("c4"), 1); // removes c4 from the players inventory
    outputText("You blew a hole through the east wall!");
    playerScore += 10;
  }
  else if (currentRoom.name != upRooms.name) {
    outputText("You can't do that here.");
  }

  else if (!playerInventory.includes("c4")) {
    outputText("You don't have any c4!");
  }
}

//event for hitting a guard
function hitGuard(currentRoom) {
  if (currentRoom.guard != undefined && currentRoom.guard == true && currentRoom.objects.includes("vulnerableguard")) { // checks if the room contains a guard that is able to be overpowered by being hit
    currentRoom.guard = false;
    textSplitter("You attack the guard and overpower them with your fists, a cheeky uppercut knocks the guard to the floor, unconscious. The pistol falls to the floor.");
    currentRoom.objects.push("pistol"); // adds a pistol object to the room.
    currentRoom.access.push("E"); // allows the player to exit the room once the guard has been knocked out.
    playerScore += 10;
  }
  else if (currentRoom.guard != undefined && currentRoom.guard == true && !currentRoom.objects.includes("vulnerableguard")) { // this handles if the guard is too powerful to be killed by a punch.
    textSplitter("The guard is too strong to be killed by a punch. The guard fights back and overpowers you, you fall to the floor, and the guard shoots you.");
    playerDeath();
  }
  else { outputText("There is no guard to hit.") }
}

//event for turning flashlight on
function flashlightOn(currentRoom, playerInventory) {
  if (currentRoom.dark == true && playerInventory.includes("flashlight")) { //checks if the room is dark and that the players inventory has a flashlight in
    textSplitter(currentRoom.eventDesc); //outputs the desc of the room now it's lit up.
  }
  else if (currentRoom.dark == false && playerInventory.includes("flashlight")) {
    outputText("The room is already lit up. No need to use your flashlight.")
  }
  else if (!playerInventory.includes("flashlight")) {
    outputText("You have no flashlight to use.")
  }
}

//event for clothing room entrance fight.
function clothingRoomFight(currentRoom) {

  if(currentRoom.guard == true){
    currentRoom.access.splice(0, 2) // stops the player from exiting the room whilst the guard is active
  }

  switch (true) {
    case (currentRoom.guard == true && moveCount == 1):

      textSplitter("The guard turns around and sees you standing in the room. He quickly goes to pull his gun from his pocket.");
      break;

    case (currentRoom.guard == true && moveCount == 2):
      outputText("The guard aims his gun in your direction");
      break;

    case (currentRoom.guard == true && moveCount == 3):
      textSplitter("You took too much time reacting to the guard. The guard fires his gun and hits you directly in the heart. You fall to the floor.");
      playerDeath();
  }
}

//event for player equipping clothes
function wearClothes(playerInventory, playerClothes){
  if(playerClothes == true){
    outputText("You are already wearing an army uniform.");
    return;
  }
  if(playerInventory.includes("clothes")){ // checks if the player has clothes and if so changes the state of playerClothes to true and removes the clothes from the players inventory.
    outputText("You have put on the army uniform!")
    playerClothes = true;
    playerInventory.splice(playerInventory.indexOf("clothes"),1);
    playerScore += 5;
  }
}

//event for player opening hatch to basement
function openHatch(currentRoom, playerInventory){
  if(currentRoom.name == "Basement Entrance" && currentRoom.eventOccured == false && playerInventory.includes("screwdriver")){ // if the hatch needs opening and the player has the screwdriver.
    textSplitter("You use your screwdriver to unlock the hatch and upon opening the hatch see stairs down to a basement.");
    outputText("Tip: use 'down' to go down the stairs to the basement.");
    currentRoom.eventOccured = true;
    playerScore += 10;
    return;
  }
  else if(currentRoom.name == "Basement Entrance" && currentRoom.eventOccured == true){
    outputText("The hatch has already been opened");
  }
  else if(!playerInventory.includes("screwdriver")){
    outputText("You don't have a screwdriver to use!");
  }
}
