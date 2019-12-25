//This Script creates the rooms for the game

var upRooms = [] // array for all rooms


/*
'name' is the name of the specific room object.

'number' is the number of the room based on the grid map design.

'firstDesc' is the description that will be displayed upon the first time the player enters a room.

'generalDesc' is the description that will be displayed if a player re-enters a room.

'eventDesc' is the description that will be displayed after an event has occured in the room.

'access' array contains all the directions that the player is able to exit the room this can change depending on explosion events.

'objects' array contains all the objects that are present in the room.

Some rooms won't need a 'firstDesc' because the description will stay the same.

Some rooms will need event dependant descriptions that will be displayed after a specific event has occured. e.g flashlight has been turned on.
*/


function initRooms() { // used in initGame()
  upRooms[0] = {
    entered: true,
    number: 1,
    name: "Prison",
    firstDesc: "You wake up on a hard, uncomfortable bed in a small, dim lit room. You have a big lump on your forehead and there is a large black metal door to the south of the room. The stench from the toilet is painfully bad. A camera sits in the corner of the room.",
    generalDesc: "You are in the prison room. There is a toilet and a camera and a large metal door at the south exit. I wouldn't stay in here it smells disgusting.",
    access: [],
    objects: ["camera", "toilet", "door"]
  }

  upRooms[1] = {
    entered: false,
    number: 2,
    name: "Empty Dark Room",
    generalDesc: "All you can see is pitch black",
    eventDesc: "You turn your flashlight on and look around to see that the room is empty. The walls have been stripped and the east wall appears to have a large red cross drawn across it.",
    access: ["S"], // "E" is a possibility in explosion event
    dark: true, //for flashlight event handling
    objects: ["wall"]
  }

  upRooms[2] = {
    entered: false,
    number: 3,
    name: "Guard Room",
    generalDesc: "You have walked through the broken wall into a guard room. A screwdiver is on the desk and a dead body lays strung out on the floor below you, covered in rubble.",
    access: ["W"],
    dark: false,
    objects: ["screwdriver","body"]
  }

  upRooms[3] = {
    entered: false,
    number: 4,
    name: "Clothing Room",
    firstDesc: "As you enter the room the prison door slams and locks behind you. You are surrounded by clothes hung up across the walls. A guard stands by the east door of the room, distracted by his phone. But... the guard is slowly turning around!",
    // need to edit for killing guard event
    generalDesc: "You are in the clothing room. The walls are covered in clothes which appear to be soldier uniforms.",
    access: ["N", "E"],
    objects: ["clothes", "vulnerableguard"],
    guard: true, // for the guard event of either killing the player or guard
    dark: false
  }

  upRooms[4] = {
    entered: false,
    name: "Basement Entrance",
    generalDesc: "The walls of the room are empty and covered in dust. The floor has a large metal hatch connected to it which appears to be screwed on top of something.. Perhaps an entrance to a basement?",
    eventDesc: "You are in the basement stairs room. The hatch is open and leads down into the basement.",
    eventOccured: false, // needed for unlocking hatch event
    access: ["N", "E", "S", "W"],
    dark: false,
    objects: ["hatch"]
  }

  upRooms[5] = {
    entered: false,
    name: "Store Room",
    generalDesc: "You creep through the door and the room is full of cupboards almost touching the ceiling. Blood is running along the cold concrete floor.",
    access: ["W"],
    objects: ["cabinet","cupboard"],
    dark: false
  }

  upRooms[6] = {
    entered: false,
    // room isnt accesible
    name: "Not accessible",
    access: [],
    dark: false
  }

  upRooms[7] = {
    entered: false,
    name: "Explosives Room",
    generalDesc: "You enter the room to see gunpowder is spilt all over the floor and a table with blue and red wire is sitting in the middle of the room. A paper note also lies on the table.",
    access: ["N"],
    objects: ["wire", "gunpowder","note"],
    dark: false
  }

  upRooms[8] = {
    entered: false,
    name: "Ally Prison",
    generalDesc: "Your ally lays unconscious on a bed very similar to the bed you woke up on not so long ago. A camera hides in the top corner of the room.",
    //need to edit for waking up ally event
    access: ["W"],
    dark: false
  }

  upRooms[9] = {
    entered: false,
    name: "Empty Dark Room",
    generalDesc: "All you can see is pitch black",
    eventDesc: "",
    // need to edit for flashlight event
    access: ["E", "S"],
    dark: true
  }

  upRooms[10] = {
    entered: false,
    name: "Basement Exit",
    firstDesc: "Congratulations! You have completed the first stage of Stolen Valour! You are now downstairs, a whole new floor to explore!",
    generalDesc: "You are in the basement stairs room (downstairs).",
    access: ["W"],
    dark: false
  }

  upRooms[11] = {
    entered: true,
    name: "ISIS Plot Base",
    firstDesc: "You climb through the exploded wall and see a guard stunned on the floor holding a gun in his hand.",
    //need to edit for killing the guard event
    access: ["S"],
    dark: false
  }

  upRooms[12] = {
    entered: false,
    name: "Medic Room",
    generalDesc: "",
    access: ["N", "E"],
    dark: false
  }

  upRooms[13] = {
    entered: false,
    name: "Weapons Room",

  }

  upRooms[14] = {
    entered: false,
    name: ""
  }

  upRooms[15] = {
    entered: false,
    name: "Not Accessible"
  }

  upRooms[16] = {
    entered: false,
    name: ""
  }

  upRooms[17] = {
    entered: false,
    name: ""
  }
}