let buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColor="";
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
// let turn = 'computer';
let level = 0;
let count = 0;

function playSound(randomChosenColor) {
    new Audio("./sounds/" + randomChosenColor + ".mp3").play();
}
function buttonAnimation(currentKey){
    let activeButton = $("#"+currentKey);
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed")
    },100);
}

function computerTurn(){
    level++;
    $("h1").text("Level "+ level);
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    buttonAnimation(randomChosenColor);
    // turn = 'player';
      
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
}


$("body").keypress(function(event) {
    if (gameStarted===false){
       gameStarted = true;
       console.log('Starting the game...');
       computerTurn();
    }
});


$(".btn").on("click", function() {
    if (gameStarted===true){
        let userChosenColor = this.id;
        buttonAnimation(userChosenColor);
        playSound(userChosenColor);
        console.log(userChosenColor);
        console.log(count);
        if (gamePattern[count]!== userChosenColor){
            gameOver();
        } else {
            count++;
            
            if (gamePattern.length === count){
                count = 0;
                setTimeout(function(){computerTurn()},900);
            }
        }
       
    }
              
});

function gameOver(){
    count = 0;
    gameStarted = false;
    $("h1").text("Game over. Press any key to start new game.");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    } ,100);
    level = 0; 
 
    gamePattern = [];
}