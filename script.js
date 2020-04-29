var start = document.getElementById("start");
var startBtn = document.getElementById("startBtn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var lastQuestGrade = document.getElementById("lastQuestGrade");
var scoreDiv = document.getElementById("scoreContainer");
var quizScore = document.getElementById("quizScore");
var submitBtn = document.querySelector("#submitBtn");
var inputInitials = document.querySelector("#inputInitials")
var msgDiv = document.querySelector("#msg");
var userInitialsSpan = document.querySelector("#userInitials");
var hsInputForm = document.querySelector("initialSubmit")
var userFinalScore = document.querySelector("#userFinalScore");
var highScores = [{
    initials: "",
    score: "",
}];
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoresBtn = document.getElementById("clearHighScoresBtn");

var questions = [
    {
        question: "The condition in an if/ else statement is enclosed within _____.",
        choiceA: "quotes",
        choiceB: "curly brackets",
        choiceC: "parentheses",
        choiceD: "square brackets",
        correct: "C",
    },
    {
        question: "If/Else statements are best suited for ______.?",
        choiceA: "performing calculation",
        choiceB: "making decisions",
        choiceC: "releasing a key",
        choiceD: "executing a function",
        correct: "B",
    },
    {
        question: "The specific element stored within an array can be targeted using the element's ______.",
        choiceA: "index",
        choiceB: "length",
        choiceC: "element",
        choiceD: "number",
        correct: "A",
    },

    {
        question: "Which is not a primitive data type in JavaScript?",
        choiceA: "boolean",
        choiceB: "number",
        choiceC: "string",
        choiceD: "character",
        correct: "D",
    },
];

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;
var count = 0;
var quizTime = 60;
var gaugeWidth = 150;
var gaugeProgressUnit = gaugeWidth / quizTime;
var TIMER;
var final = 0;
var score = 0;

init();

// Display question
function renderQuestion() {
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = "1. " + q.choiceA;
    choiceB.innerHTML = "2. " + q.choiceB;
    choiceC.innerHTML = "3. " + q.choiceC;
    choiceD.innerHTML = "4. " + q.choiceD;
}

// start quiz button
startBtn.addEventListener("click", startQuiz);
// go back button
highScoreHeader.addEventListener("click", renderHighScore);

// Start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}
// progress bar
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
// Render counter
function renderCounter() {
    if (count <= quizTime) {
        counter.innerHTML = quizTime - count;
        timeGauge.style.width = gaugeProgressUnit * count + "px";
        count++;
    } else {
        // end the quiz and show the score
        finalScore = 0;
        console.log(finalScore);
        clearInterval(TIMER);
        renderScore();
    }
}
// Check answer
function checkAnswer(answer) {
    if (questions[runningQuestionIndex].correct == answer) {

        score++;
        answerIsCorrect();
    } else {

        answerIsWrong();
    }
    if (runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        renderQuestion();
    } else {
        finalScore = quizTime - count;
        if (finalScore < 0) { finalScore = 0 };
        clearInterval(TIMER);
        renderScore();
    }
}
// Answer is correct - green background
function answerIsCorrect() {
    lastQuestGrade = "Correct!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}
// Answer is wrong - red background and reduce time by 10
function answerIsWrong() {
    lastQuestGrade = "Wrong!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
    count = count + 10;
}
// Render score
function renderScore() {
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    let scorePercent = Math.round(100 * score / questions.length);
    quizScore.innerHTML += "<p>Score = " + finalScore + "</p>";
}
// Store scores in local storage
function storeScores() {
    // Stringify and set "scores" key in localStorage to scores object
    localStorage.setItem("user", JSON.stringify(highScores));
}
// Submit Score
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scoreContainer.style.display = "none";
    var objInitials = document.querySelector("#inputInitials").value.trim();

    console.log(highScores);
    console.log(objInitials);
    console.log(finalScore);

    highScores.push({ initials: objInitials, score: finalScore });
    console.log(highScores.push({ initials: objInitials, score: finalScore }));
    console.log(highScores);
    storeScores();
    renderHighScore();
});

// Event listener for go back button
goBackBtn.addEventListener("click", goBack);
// Event listner for clear scores button
clearHighScoresBtn.addEventListener("click", clearHighScores);

// Rendor high score list
function renderHighScore() {
    // Set style display flags
    highScoreHeader.style.display = "none";
    start.style.display = "none";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    //Clear High Score list element
    highScoreList.innerHTML = "";
    // Render a new li for each high score
    for (var i = 0; i < highScores.length; i++) {
        var hs = highScores[i];
        var li = document.createElement("li");
        li.textContent = hs;
        li.setAttribute("data-index", i);
        highScoreList.appendChild(li)
    }
}
// Get stored initials and scores from localStorage
function init() {
    // Parsing the JSON string to an object
    var storedHighScore = JSON.parse(localStorage.getItem("user"));
    console.log(storedHighScore);
    // if high scores were retrieved from localStorage, update the scores object to it
    if (storedHighScore != null) {
        highScores = [storedHighScore];
    }
}
// Tranfer to quiz div
function goBack() {
    // Set style display flags
    console.log(inputInitials.value);
    inputInitials.value = "";
    console.log(inputInitials.value);
    highScoreHeader.style.display = "block";
    start.style.display = "block";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "none";
    lastQuestionIndex = questions.length - 1;
    // Reset quiz variables
    runningQuestionIndex = 0;
    count = 0;
    quizTime = 60;
    gaugeWidth = 150;
    gaugeProgressUnit = gaugeWidth / quizTime;
    final = 0;
    score = 0;
    quizScore.innerHTML += "";
    console.log(progress.innerHTML);
    progress.innerHTML = "";
    quizScore.innerHTML = "";
    console.log(progress.innerHTML);
}
// Clear highscore list
function clearHighScores() {
    highScoreHeader.style.display = "none";
    start.style.display = "none";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    localStorage.clear();
    init();
    renderHighScore();
}