// This script defines all the objects that will be in the game
/* 
'name' is the name of the object

'room' is the room that the object spawns in.

'gettable' is a boolean value that confirms whether or not the player can pick up the object.
  
'description' is the object description that is outputted when the player examines the object.

'dropped' is for if the object has previously been dropped so if picked up again score is not given.

*/



var objects = [] //array for all objects

function initObjects() { // used in initGame()
  objects[0] = {
    name: "camera",
    room: "Prison",
    description: "As you look closer at the camera you see that the light is on... you are being watched.",
    gettable: false,
    dropped: false
  }

  objects[1] = {
    name: "toilet",
    room: "Prison",
    description: "You pinch your nose and hold your breath before staring down into the toilet bowl. Sitting in the toilet bowl is a key.",
    gettable: false,
    keyTaken: false, // specific for if key is picked up
    dropped: false
  }

  objects[2] = {
    name: "key",
    room: "Prison",
    description: "The key is small and rusty, perhaps it was for an old door?",
    gettable: true,
    dropped: false
  }
  objects[3] = {
    name: "door",
    room: "Prison",
    description: "The door appears to be rusted and dented. A small keyhole is visible on the left side.",
    gettable: true,
    dropped: false
  }

  objects[4] = {
    name: "clothes",
    room: "Clothing Room",
    description: "These clothes are clean and dry. Perhaps they could be used as a disguise?",
    gettable: true,
    dropped: false
  }

  objects[5] = {
    name: "ammo",
    room: "Store Room",
    description: "The ammo appears to be for a 44m pistol.",
    gettable: true,
    dropped: false
  }

  objects[6] = {
    name: "c4",
    room: "Crafted Item",
    description: "Made from wire and gunpowder this could be used to make a large explosion.",
    gettable: true,
    dropped: false
  }

  objects[7] = {
    name: "flashlight",
    room: "Store Room",
    description: "A simple flashlight that can be used to light up dark areas.",
    gettable: true,
    droppable: false
  }
  objects[8] = {
    name: "pistol",
    room: "Clothing Room",
    description: "On closer examination you see that the pistol is a 44mm.",
    reloaded: false, // for reload and shoot event handling
    gettable: true,
    dropped: false
  }
  objects[9] = {
    name: "cupboard",
    room: "Store Room",
    description: "You look into the cupboard and find a flashlight and some ammo.",
    eventDesc: "The cupboard is empty.",
    gettable: false,
    opened: false,
    dropped: false // for first time opening case handler
  }
  objects[10] = {
    name: "screwdriver",
    room: "Guard Room",
    description: "A basic screwdriver made of steel.",
    gettable: true,
    dropped: false
  }
  objects[11] = {
    name: "wire",
    room: "Explosives Room",
    description: "The wire could perhaps be used as a part to make an explosive?",
    gettable: true,
    dropped: false
  }
  objects[12] = {
    name: "gunpowder",
    room: "Explosives Room",
    description: "Light it up and it goes bang bang. A key ingredient in any explosive.",
    gettable: true,
    dropped: false
  }
  objects[13] = {
    name: "note",
    room: "Explosives Room",
    description: "The note reads: 'I need 20 working c4 by the end of tomorrow or there will be consequences.'",
    gettable: true,
    dropped: false
  }
  objects[14] = {
    name: "wall", // in upstairs empty room, wall that can be exploded.
    room: "Empty Dark Room",
    description: "Upon closer examination you see that the wall is quite hollow and weak.",
    gettable: false,
    dropped: false
  }
  objects[15] = {
    name: "hatch",
    room: "Basement Entrance",
    description: "The hatch has screws on all 4 sides.",
    eventDesc: "The hatch is open with the entrance to the basement now showing.",
    gettable: false,
    dropped: false
  }
  objects[16] = {
    name: "body",
    room: "Guard Room",
    description: "The body appears to still be warm. The explosion must have killed this guard.",
    gettable: false,
    dropped: false
  }
}
