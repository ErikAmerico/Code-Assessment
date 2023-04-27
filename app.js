const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit')
const questionH2 = document.querySelector('.question');
const choicesContainer = document.querySelector('.answers');
const result = document.querySelector('.result');
const ol = document.createElement('ol')
const h1 = document.querySelector('h1');
const header = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
let choices = document.querySelectorAll('input[name="q1"]');
const countdownTimer = document.getElementById("countdownTimer");

body.style.backgroundColor = 'lightgrey'
startButton.setAttribute("style", "background-color: green; border-radius: 10px; font-weight: bold; width: 115 px; height: 37.5px;")
submitButton.setAttribute("style", "background-color: red; border-radius: 10px; font-weight: bold; width: 115 px; height: 37.5px;")

const restartButton = document.createElement('button');
restartButton.textContent = 'RESTART';
restartButton.classList.add('restartButton');
startButton.insertAdjacentElement('afterend', restartButton)
restartButton.setAttribute("style", "background-color: yellow; border-radius: 10px; font-weight: bold; width: 115 px; height: 37.5px;")

submitButton.disabled = true;
restartButton.disabled = true;

main.setAttribute("style", "text-align:center; ")
header.setAttribute("style", "text-align:center; ")
choicesContainer.setAttribute("style", "text-align:center; ")
questionH2.setAttribute("style", "color: teal;")
ol.setAttribute("style", "text-align:center; font-size: larger; font-weight:bold")
h1.setAttribute("style", 'background-color: white; border: 1px solid teal; margin-right: 33%; margin-left: 33%; border-radius: 10px; box-shadow: 5px 5px 10px 5px teal;')

choicesContainer.textContent = "Answer the following questions correctly to achieve the high score! Don't run out of time.";
choicesContainer.setAttribute('style', "font-weight: bold; color: teal;")

const boringQuestions = [{
    question: "What is 2+2?",
    answers: ["3", "4", "5", "5"],
    correctAnswer: "4"
},
{
    question: "What is the capital of Mass?",
    answers: ["Amesbury", "Boston", "Derry, NH", "Somerville"],
    correctAnswer: "Boston"
},
{
    question: "Who is the President?",
    answers: ["Obama", "Trump", "Biden", "Tom Brady"],
    correctAnswer: "Biden"
},
{
    question: "What month is it?",
    answers: ["Tuesday", "March", "December", "April"],
    correctAnswer: "April"
}];

//Again, I don't fully understand this function.
//But the game would be even more boring without it.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const questions = shuffleArray(boringQuestions);

let correct;

function updateQuestion() {
    const currentQuestion = questions[CurrentQuestionsIndex]; //where is CQI
    questionH2.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    renderChoices();
    const correct = defineCorrectAnswer();
    startButton.disabled = true;
    startButton.textContent = "-----------"
    restartButton.disabled = true;
    restartButton.textContent = "-----------"
    return correct;
}

function defineCorrectAnswer() {
    const currentQuestion = questions[CurrentQuestionsIndex];
    correct = currentQuestion.correctAnswer;
    return correct;
}

startButton.addEventListener('click', function () {
    countdownTimer.setAttribute("style", " background-color: white; margin-left:45%; margin-right: 45%; margin-bottom: 20px; font-size: 25px; border: 1px solid teal; border-radius: 10px;")
    CurrentQuestionsIndex = 0;
    submitButton.disabled = false;
    restartButton.disabled = false;
    choicesContainer.setAttribute('style', "font-size: larger; color: black;")
    updateQuestion();
    startCountdown();
})

restartButton.addEventListener('click', function () {
    location.reload();
})

submitButton.addEventListener('click', function () {
    let isCorrect = false;
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            const selectedAnswer = choices[i].value;
            if (selectedAnswer === correct) {
                isCorrect = true;
            }
        }
    }
    console.log(choices)
    if (isCorrect) {
        result.textContent = "Last answer: CORRECT!";
    } else {
        result.textContent = "Last answer: WRONG. -20 seconds, aka POINTS!";
        countdownTime -= 20;
        submitButton.disabled = true;
        setTimeout(function () {
            submitButton.disabled = false;
        }, 1000);
    }
    CurrentQuestionsIndex++;
    if (CurrentQuestionsIndex === questions.length || countdownTime <= 0) {
        setTimeout(function () {
            endGame();
        }, 1500);
    } else {
        updateQuestion();
    }
});

function endGame() {
    clearInterval(countdownInterval);
    countdownTimer.setAttribute("style", " background-color: white;  margin-left:44%; margin-right: 44%; margin-bottom: 20px; font-size: 15px; border: 1px solid teal; border-radius: 10px;")
    countdownTimer.textContent = "YOUR FINAL SCORE: " + countdownTime;
    questionH2.textContent = "GAME OVER!"
    choicesContainer.innerHTML = "LETS SEE HOW YOU DID!";
    submitButton.disabled = true;
    startButton.disabled = true;
    restartButton.disabled = false;
    restartButton.textContent = "RESTART"
    submitButton.textContent = "-------------"

    const form = document.createElement("form");
    const label = document.createElement("label");
    label.setAttribute("style", "font-weight: bold; border:solid teal 2px; border-radius: 10px;")
    label.textContent = "*Enter initials: ";
    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.maxLength = 3;
    const button = document.createElement("button");
    button.textContent = "Save Score";
    button.setAttribute("style", "background-color: teal; border-radius: 10px; font-weight: bold; width: 115 px; height: 37.5px;")
    button.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.appendChild(ol);
        let playerName = input.value;
        let playerScore = countdownTime;
        localStorage.setItem(playerName, playerScore);
        button.disabled = true;
        button.textContent = "-------------"
        input.value = '';
        let scoreboard = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            scoreboard.push(`${key}: ${value}`);
        }

        scoreboard.sort((a, b) => {
            const numA = parseInt(a.split(":")[1].trim());
            const numB = parseInt(b.split(":")[1].trim());
            return numB - numA;
        });

        for (let i = 0; i < scoreboard.length; i++) {
            const li = document.createElement('li');
            li.textContent = scoreboard[i];
            ol.appendChild(li);
        }

    });


    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    choicesContainer.appendChild(form)
    result.textContent = "--Good Luck on the scoreboard my friend!--";
}

function renderChoices() {
    const currentQuestion = questions[CurrentQuestionsIndex];
    const selectedValues = [];
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const answer = currentQuestion.answers[i];
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "q1"
        input.value = answer;
        input.checked = false;
        li.appendChild(input);
        li.appendChild(document.createTextNode(answer));//li.textcontent = answer
        choicesContainer.appendChild(li)
    }
    choices = document.querySelectorAll('input[name="q1"]');
}

let countdownInterval;
let countdownTime = 90;

function startCountdown() {
    countdownInterval = setInterval(function () {
        countdownTime--;
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.textContent = 0.0;
            endGame();
            countdownTime = 90;
        } else {
            countdownTimer.textContent = countdownTime;
        }
    }, 1000);
}