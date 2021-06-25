'use strict';
let numberToGuess;
let maxScore = 10;
let currScore = 0;
let highestScore;

function message(str){
    let message = document.getElementsByClassName("message")[0];

    message.textContent = str;
}

document.body.addEventListener("keydown", (e)=>{
    if(e.keyCode==13)
    check();
});

function check(){
    let guess = +document.getElementsByClassName("guess")[0].value;
    if(guess<numberToGuess){
        message("Guess Higher Number!!!");
        maxScore -= 1;
    }
    else if(guess>numberToGuess){
        message("Guess Lower Number!!!");
        maxScore -= 1;
    }
    else{
        message("Correct!!!You Won");
        document.body.style.backgroundColor = "#60b347";
        currScore += maxScore;
        document.querySelector(".number").textContent = numberToGuess;
        if(currScore>highestScore){
            localStorage.setItem("highestScore", currScore);
        }
        }
    updateScore();
    if(maxScore<=0){
        message("Chances Exhausted!!! TRY AGAIN");
        document.getElementById("check").disabled = true;
    }
}

function updateScore(){
    document.querySelector(".score").textContent = currScore;
}

function reset(){
    document.body.style.backgroundColor = "#222";
    document.querySelector(".guess").value = 0;
    document.querySelector(".number").textContent = "?";
    numberToGuess = Math.trunc(Math.random()*100);
    maxScore = 10;
    document.getElementById("check").disabled = false;
    message("Start guessing...");
    highestScore = +localStorage.getItem("highestScore");  
    document.querySelector(".highscore").textContent = highestScore;
    updateScore();
}

reset();

