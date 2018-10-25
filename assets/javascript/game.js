var randomNumMin = 50; //The minimum random number that should be generated for the user to work with.
var randomNumMax = 70; //The maximum random number that should be generated for the user to work with.
var buttonValueMin = 1; //The minimum random number that should be assigned to the crystal buttons.
var buttonValueMax = 10; //The maximum random number that should be assigned to the crystal buttons.
var numberOfButtons = 4; //The number of crystal buttons.
var buttonForcedToOddNumber;
/* This will be used to store a randomly generated number between 1 and the 
   numberOfButtons (maximum number of buttons used).  This will be used to force 
   the applicable button to contain an odd number*/
var randomNum; // The random number that will be generated.
var button1Value; //The random number that will be assigned to the crystal button 1.
var button2Value; //The random number that will be assigned to the crystal button 2.
var button3Value; //The random number that will be assigned to the crystal button 3.
var button4Value; //The random number that will be assigned to the crystal button 4.
var score; //The score
var wins; //The number of wins
var losses; //The number of losses
var bStartButtonClicked = false;
/*The boolean variable for whether the Start button 
   has been clicked yet.  This will be used to restrict the user input until the Start button 
   has been clicked. */

//Resets the entire game
function resetGame() {
  wins = 0;
  losses = 0;
  $(".results-win").html("<h1>" + wins + "</h1>");
  $(".results-losses").html("<h1>" + losses + "</h1>");
  //This will randomly select 1 button.  This 1 button will eventually be forced to be an odd number.
  buttonForcedToOddNumber = Math.floor(Math.random() * (numberOfButtons - 1 + 1)) + 1;
};

//Resets the round.  This does NOT reset the game.
function resetGameRound() {
  //Generates the randomNum for the user to work with.
  randomNum = Math.floor(Math.random() * (randomNumMax - randomNumMin + 1)) + randomNumMin;
  //Sets the values for the buttons.  The SetButtonNum function is used.
  button1Value = SetButtonNum(1);
  button2Value = SetButtonNum(2);
  button3Value = SetButtonNum(3);
  button4Value = SetButtonNum(4);
  //Resets the score to 0
  score = 0;

  $(".random-number").html("<h1>" + randomNum + "</h1>");
  $("#button-1").attr("Value", button1Value);
  $("#button-2").attr("Value", button2Value);
  $("#button-3").attr("Value", button3Value);
  $("#button-4").attr("Value", button4Value);
  $(".score").html("<h1>" + score + "</h1>");
};

/*Receives a number parameter. Checks to see if it is an even number. 
If it is an even number,return the value as is. If it is not an even number, 
and is an odd number, add 1 to the number and return the value*/

//This function is not currently required. 
/*
function ForceEvenNumber(num) {
  if (num % 2 === 0) {
      return num;
  } else {
      return num + 1;
  }
}
*/

/*Receives a number parameter. Checks to see if it is an even number. 
If it is an even number, subtract 1 from the number making it an odd number. 
If it is not an even number and is an odd number, return the value as is.*/
function ForceOddNumber(num) {
  if (num % 2 === 0) {
    return num - 1;
  } else {
    return num;
  }
}

//Sets the value attribute for the buttons.
function SetButtonNum(buttonNum) {

  /*Sets the variable to the random value between the min and max button values specified.  
    The result could be an odd or even number.*/
    var buttonRandomValue = Math.floor(Math.random() * (buttonValueMax - buttonValueMin + 1)) + buttonValueMin;

  //Checks if the button was randomly selected for it's value to be forced to an odd number.
  //If so, reset the value to an odd number.
  if (buttonNum === buttonForcedToOddNumber) {
    //Sets the varaible to an odd number.
    var buttonRandomValue = ForceOddNumber(buttonRandomValue);
  }
 

  return buttonRandomValue;
};

//Connects the onclick event to the cystal buttons.
$('.button-crystal').on('click', function (event) {
  /*If the start button is not clicked, if the user clicks the crystal buttons, 
  do nothing and return. */
  if (bStartButtonClicked === false) {
    return; // exits the function.
  }
  var $element = $(this);
  //This will return the value of the element that was clicked.
  var value = $element.attr("value");
  //Add to the score variable based on the value attribute assigned to the button.
  score += parseInt(value);
  //Write the score to the score section.
  $(".score").html("<h1>" + score + "</h1>");
    
    //Checks for a win scneario where the random generated number matches the user's score.
    if (randomNum === score) {
      wins++;
      $(".results-win").html("<h1>" + wins + "</h1>");
      resetGameRound();
    /*Checks for a loss scneario where the random generated number 
    is greater than the user's score. */
    } 
    else if (score > randomNum) {
      losses++;
      $(".results-losses").html("<h1>" + losses + "</h1>");
      resetGameRound();
    }
});

//Connects the onclick event to the Start button.
$('#button-start').on('click', function (event) {
  bStartButtonClicked = true;
  resetGame();
  resetGameRound();

});