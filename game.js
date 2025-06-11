var gamePattern=[];

var buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[]
var started=false;
var level=0;

$(document).keydown(function () {
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    
    }}
)

$(".btn").click(function () {
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1)
    });



function playSound(name) {

    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();

    
}


function nextSequence(){
    userClickedPattern=[];


    level++;
    $("h1").text("Level "+level)

    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColour=buttonColours[randomNumber];


    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");
    
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");} , 100);

}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        startOver();

    };
}


function startOver() {
    level=0;
    started=false;
    gamePattern=[];
    
}