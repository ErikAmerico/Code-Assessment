
const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit')
const questionH2 = document.querySelector('.question');
const choicesContainer = document.querySelector('.answers');
const result = document.querySelector('.result');
const h1 = document.querySelector('h1');
const header = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');


body.style.backgroundColor = 'lightgrey'
startButton.setAttribute("style", "background-color: green; border-radius: 10px;")
submitButton.setAttribute("style", "background-color: red; border-radius: 10px;")

const restartButton = document.createElement('button');
restartButton.textContent = 'RESTART';
restartButton.classList.add('restartButton');
startButton.insertAdjacentElement('afterend', restartButton)
restartButton.setAttribute("style", "background-color: yellow; border-radius: 10px;")

main.setAttribute("style", "text-align:center; ")
header.setAttribute("style", "text-align:center; ")
choicesContainer.setAttribute("style", "text-align:center; ")


const boringQuestions = [{
    question: "What is 2+2?",
    answers: ["3", "4", "5", "5"],
    correctAnswer: "4" //this.answers[1]
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

function updateQuestion() {
    const currentQuestion = questions[CurrentQuestionsIndex]; //where is CQI
    questionH2.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    renderChoices();
}

startButton.addEventListener('click', function () {
    console.log("game started")
    CurrentQuestionsIndex = 0;
    submitButton.disabled = false;
    restartButton.disabled = false;
    updateQuestion();
})

restartButton.addEventListener('click', function () {
    location.reload();
})

submitButton.addEventListener('click', function () {
    CurrentQuestionsIndex++;
    if (CurrentQuestionsIndex === questions.length || countdownTime <= 0) {
        endGame();
    } else {
        updateQuestion();
    }
});

//selectedValues is an attempt to collect chosen answer.
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
        li.appendChild(document.createTextNode(answer));
        li.addEventListener('click', function () {
            selectedValues.push(input.value);
        })
        choicesContainer.appendChild(li)
    }
    const choices = document.querySelectorAll('input[name="q1"]');
    //**console.log(choices);
    //*console.log(selectedValues)
}

let countdownInterval;
let countdownTime = 90;

function startCountdown() {
    countdownInterval = setInterval(function () {
        countdownTime--;
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.textContent = 0.0;
            countdownTime = 90;

        } else {
            countdownTimer.textContent = countdownTime;
        }
    }, 1000);
}