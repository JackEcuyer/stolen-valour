/* This script defines functions for all the commands in the game and functions internally required in the commands. 
so they can be executed from the parser in the main script. */

//function for checking what description should be output when entering a room
function descCheck(currentRoom) {
  if (currentRoom.eventOccured == true && currentRoom.eventDesc != undefined){// outputs the description of the room after an event has occured in the room.
    textSplitter(currentRoom.eventDesc);
    return;
  }
  else if (currentRoom.firstDesc != undefined && currentRoom.entered == false) { //This if statement checks whether the room has a description specifically for the first time you enter it, and if it does and the room has not already been entered, it outputs that first description.

    playerScore += 2; 
    textSplitter(currentRoom.firstDesc);
    currentRoom.entered = true; //changes the room to show it has been entered
  }
  else {
    textSplitter(currentRoom.generalDesc);
  }

}

//function for moving north
function goNorth(currentRoom) {
  if (currentRoom.access.includes("N")) { // checks to see if the room enables the player to exit from the north.
    currentPos -= 3; //moves the player north
    return true; //returns true to show the player has moved room;
  }
  else {
    outputText("you can't go there.");
    return false; //returns false to show the player hasn't moved room
  }
}

//function for moving east
function goEast(currentRoom) {
  if (currentRoom.access.includes("E")) { // checks to see if the room enables the player to exit from the east.
    currentPos++; //moves the player east
    return true;
  }
  else {
    outputText("you can't go there.");
    return false; //returns false to show the player hasn't moved room
  }
}

//function for moving south
function goSouth(currentRoom) {
  if (currentRoom.access.includes("S")) { // checks to see if the room enables the player to exit from the north.
    currentPos += 3; //moves the player south
    return true;
  }
  else {
    outputText("you can't go there.");
    return false; //returns false to show the player hasn't moved room
  }
}

//function for moving west
function goWest(currentRoom) {
  if (currentRoom.access.includes("W")) { // checks to see if the room enables the player to exit from the north.
    currentPos--; //moves the player north
    return true;
  }
  else {
    outputText("you can't go there.");
    return false; //returns false to show the player hasn't moved room
  }
}

//function for looking around the room (displays a description of surroundings).
function lookAround(currentRoom) {
  textSplitter(currentRoom.description);
  //need to work out how to change description depending on different events.
}

//function for the examine command.
function examineObject(object, currentRoom, inventory) {
  object = object.toLowerCase();
  foundObject = findObject(object, objects);

  if (foundObject.name == "cupboard" && foundObject.opened == false) { //specific case for if the object is store room cupboard
    currentRoom.objects.push("flashlight", "ammo");
    foundObject.opened = true;
    playerScore += 5;
  }

  if (foundObject.name == "toilet" && foundObject.keyTaken == false) { //specific case for if the object is the prison room toilet
    currentRoom.objects.push("key");
    foundObject.keyTaken = true;
  }

  if (currentRoom.objects != undefined && currentRoom.objects.includes(object)) { // this checks if the current room that the player is in contains the object they would like to examine and if it does the object description is output.
    // puts the desired object in a new variable
    textSplitter(foundObject.description);
  }
  else if (inventory.includes(object)) { // this checks if the object is in the players inventory and if it is then the description of the object is output.
    textSplitter(foundObject.description);
  }

  else {
    outputText("That object doesn't exist here.");
  }
}

//function for locating which object the player specifies
function findObject(object) {
  for (o of objects) { // loops through all objects
    if (object == o.name) { // if object name is the same
      return o; // returns the matching object
    }
  }
  return false; // if the object doesn't exist in the objects array.
}

//function for is the user wants to clear the console
function clearConsole() {
  textbox.innerHTML = "";
}

//function for outputting the description of the players current location.
function lookAround(currentRoom) {
  descCheck(currentRoom);
}

//function for a player picking up an object
function takeObject(currentRoom, object, playerInventory) {
  object = object.toLowerCase();
  foundObject = findObject(object);

  if (currentRoom.objects.includes(object) && foundObject.gettable == true) { //if the current room contains the object that the player would like to pickup and it is able to get picked up

    if (foundObject.name == "key") { // specific case for if the player has picked up the prison room key from the toilet
      objects[1].description = "The toilet bowl still smells disgusting... I wouldn't keep looking in there if you down want to catch ecoli."
    }

    else if (foundObject.name == "flashlight" ||foundObject.name == "ammo") { // specific case for if the player picks up flashlight or ammo.
      objects[9].description = "The cupboard is empty.";
    }

    else if(foundObject.name == "screwdriver"){ // specific case for if player picks up screwdriver.
      currentRoom.generalDesc = "You are in the guard room. A body lies on the floor below you covered in rubble. The desk is empty."
    }

    playerInventory.push(object); // adds the object to the players inventory
    currentRoom.objects.splice(currentRoom.objects.indexOf(object), 1); // removes the object from the room so it can't be picked up multiple times

    // adds score if its the first time the player has picked up the object.
    if(foundObject.dropped == false){
      playerScore += 2;
    }
    outputText("Inventory now contains: " + object);
  }
  else if (foundObject.gettable == false) { // if the object exists but can't be picked up 
    outputText("You can't pickup the " + object + ".");
  }
  else {
    outputText("There is no " + object.toLowerCase() + " in this room.");
  }
}

// function for outputting the players inventory
function showInventory(playerInventory) {
  if (playerInventory.length > 0) {
    outputText("These are the items currently in your inventory:")
    for (object of playerInventory) { // loops through every item in the players inventory and outputs each one individually.
      outputText("- " + object);
    }
  }
  else { // case for no items in the players inventory
    outputText("You don't have any items in your inventory.");
  }
}

//function for a player dropping an object
function dropObject(currentRoom, object, playerInventory) {
  object = object.toLowerCase();
  foundObject = findObject(object);
  for (o of playerInventory) { // loops through the players inventory to see if it contains the object that the player would like to drop.
    outputText(o);
    if (o == object) {
      playerInventory.splice(playerInventory.indexOf(object), 1); // removes the object from the players inventory
      currentRoom.objects.push(object) // adds the object to the list of objects in the current room
      outputText("you dropped " + object + " from your inventory");
      foundObject.dropped = true;
      return;
    }
  }
  outputText("This item isn't in your inventory."); // if the object isn't present in the players inventory
}

//function for reloading pistol
function reloadPistol(playerInventory) {
  // case for if the pistol is already reloaded
  if (playerInventory.includes("pistol") && objects[8].reloaded) {
    outputText("Your pistol is already reloaded.")
    return;
  }
  // case for if player does not have a pistol
  else if (!playerInventory.includes("pistol")) {
    outputText("You don't have a pistol to reload.");
    return;
  }

  // case for if player does not have any ammo
  else if (!playerInventory.includes("ammo")) {
    outputText("You dont have any ammo.");
    return;
  }
  //this code sets the pistol to reloaded and removes the ammo from the players inventory.
  else if (playerInventory.includes("ammo") && playerInventory.includes("pistol")) {
    outputText("You have reloaded your pistol.");
    playerInventory.splice(playerInventory.indexOf("ammo"),1);
    objects[8].reloaded = true;
    playerScore += 5;
  }
}

//function for crafting c4
function craftObject(playerInventory, objectToCraft){
  objectToCraft = objectToCraft.toLowerCase();
  switch(objectToCraft) { // checks to see what object the player would like to craft. Each case will handle different items that the player will need before crafting an item.
    case "c4":
      if(playerInventory.includes("wire") && playerInventory.includes("gunpowder")){
        playerInventory.push("c4");
        playerInventory.splice(playerInventory.indexOf("wire"),1);
        playerInventory.splice(playerInventory.indexOf("gunpowder"),1);
        outputText("You have crafted some c4!");
        playerScore += 10;
      }
      break;
  }
}

//function for going downstairs
function goDown(currentRoom){
  if(currentRoom.name == "Basement Entrance" && currentRoom.eventOccured == true) { // if player is in hatch room and the hatch has been opened.
    currentPos += 6 // moves the current room down to the downstairs section.
  }
  else if(currentRoom.name == "Basement Entrance" && objects[15].eventOccured == false){
    outputText("The hatch is screwed shut!");
    return;
  }
  else{outputText("You can't go downstairs here!")};
    return;
}
