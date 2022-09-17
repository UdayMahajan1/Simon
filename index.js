var userPattern = [] ;
var gamePattern = [] ;
var buttonColours = ["red", "blue", "green", "yellow"] ;
var level = 0 ;
// THIS FUNCTION EXECUTES THE NEXT SEQUENCE I.E TELLS THE NEXT BUTTON TO BE PRESSED
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4) ;
    var randomChosenColour = buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour) ;
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour) ;
    level++ ;
    $("h1").text("Level "+level);
}
// THIS METHOD DETECTS FOR CLICK ON THE SPECIFIC BUTTON
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    console.log(userPattern);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checker(userPattern.length-1);   
});
// THIS FUNCTION CREATES SOUND WHEN A BUTTON IS PRESSED OR SHOWED BY THE WEBSITE
function makeSound(button) {
    var sound = new Audio("sounds/"+button+".mp3");
    sound.play() ;
}
// THIS FUNCTION INTEGRATES THE PRESSED CLASS INTO THE BUTTONS TO APPLY EFFECTS WHEN CLICKED
function animatePress (currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
// THIS METHOD STARTS THE GAME BY DETECTING A KEYPRESS ON THE KEYBOARD IN THE DOCUMENT
$(document).on("keydown", function(e){
    nextSequence();
});
// THIS FUNCTION IS USED TO RESET VARIABLES AND ARRAYS TO THE ORIGINAL STATE AFTER THE GAME IS LOST
function startover(){
    level = 0 ; 
    gamePattern = [];
    userPattern = [];
}
// THIS FUNCTION IS THE MAIN BODY OF THE GAME...IT COMPARES THE INPUT OF THE USER WITH THE SEQUENCE OF THE GAME 
function checker (levelNumber) {
    // GAME OVER CONDITION
    if(userPattern[levelNumber] !== gamePattern[levelNumber]) {
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
    // TO ACCEPT ENOUGH INPUTS FROM THE USER FOR THE ABOVE CONDITION TO BE APPLICABLE
    if((userPattern.length === gamePattern.length)&&(gamePattern.length !== 0)) {
        setTimeout(function(){
            nextSequence();
        },1000);
        userPattern = [] ;
    }
}
