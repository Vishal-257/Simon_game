var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var clickAudio = new Audio("sounds/" + name + ".mp3");
  clickAudio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("failed");
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
} 