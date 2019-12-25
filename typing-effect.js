// This script is for looping through the string that is going to be output to the console and depending on the length of the string creating new lines so that the css typing effect is able to work effectively.

//the script formats the string so that it can be displayed on the screen in paragraphs that only just reach the end of each line before creating a new paragraph.

function textSplitter(string) {
  var newPara;
  console.log("starting splitter");
  let finalString = ""; // what will be returned and used in the output.

  //if the string length isnt more than one line of characters worth do the same as outputText()
  if(string.length - 113 <= 0) {
    textbox = document.getElementById('textbox');
    newPara = document.createElement("p");
    newPara.appendChild(document.createTextNode(string));
    textbox.appendChild(newPara);
    console.log(string);
    newPara.scrollIntoView;
  }

  else{

    let lineAmount = string.length / 113;
    lineAmount = Math.ceil(lineAmount);
    newPara = document.createElement("p");

    for(var i=0 ; i < lineAmount ; i++){ // loops for as many lines as are necessary.
      finalString = "";

      for(var j= 113*i; j < 113*(i+1) && j < string.length ; j++){

        finalString = finalString + string[j];

      }

      var textbox = document.getElementById('textbox');

      //creates a new paragraph element for each line that is going to be displayed on screen.
      newPara = document.createElement("p");
      newPara.appendChild(document.createTextNode(finalString));
      console.log(newPara);
      textbox.appendChild(newPara);
      newPara.scrollIntoView();
    }
  }
}



// Old non working script
// This script is for looping through the string that is going to be output to the console and depending on the length of the string creating new lines so that the css typing effect is able to work effectively.

//the script formats the string so that it can be displayed on the screen in paragraphs that only just reach the end of each line before creating a new paragraph.

/*
var exampleText = "You wake up on a hard, uncomfortable bed in a small, dim lit room. You have a big lump on your forehead and there";


function textSplitter(string) {
  let finalString = ""; // what will be returned and used in the output.

  if(string.length - 113 <= 0) {
    finalString = "<p>"+ string +"</p>";
    return finalString;
  }

  else{
    finalString = "<p>"

    let lineAmount = string.length / 133;
    lineAmount = Math.ceil(lineAmount);

    for(var i=0 ; i < lineAmount ; i++){ // loops for as many lines as are necessary.
      finalString = finalString + "</p>";
      finalString = finalString + "<p class='line-splits'>";

      for(var j= 133*i; j < 133*(i+1) && j< string.length ; j++){
        finalString = finalString + string[j];
      }
    }

    finalString = finalString + "</p>";
    finalString = finalString.slice(7);
    console.log(finalString);

    var textBox = document.getElementById('textbox');

    var parser = new DOMParser();
    var newHTML = parser.parseFromString(finalString, 'text/html')

    document.getElementById('addafterme').insertAdjacentHTML("afterend",finalString);

    
  }
}*/

//testString = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially."

