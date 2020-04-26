function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


// create questions
var questions = [
    new Question("The condition in an if/ else statement is enclosed within _____.", ["quotes", "curly brackets", "paranthese", "square brackets"], "parantheses"),
    new Question("If/Else statements are best suited for ______.?", ["performing calculation", "making decisions", "releasing a key", "executing a function"], "making decisions"),
    new Question("The specific element stored within an array can be targeted using the element's ______.", ["index", "length", "element", "number"], "index"),
    new Question("In order to actually execute a function we have written, we have to ____ it.", ["add", "run", "call", "trim"], "call"),
    new Question("We can hook onto the event of a user pressing and releasing a key by referring to ____.", ["document.onkeyup", "event.key", "addEventlistener", "oninput"], "document.onkeyup")
];

// create quiz
var quiz = new Quiz(questions);


// display quiz
populate();
