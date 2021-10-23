
var questions = [{
    question: "Which is first Indian cricket tournament ?",
    choices: ["None of these", "pepsi cup", "bombay triangular", "bombay series"],
    correctAnswer: 3
}, {
    question: "Which of the following is first cricket club in India ?",
    choices: ["bombay cricket club", "east indian cricket club", "oriental cricket club", "maharashtra cricket club"],
    correctAnswer: 3
}, {
    question: "Indian played first test match against ________ .",
    choices: ["South africa", "England", "Pakistan","Australia"],
    correctAnswer: 2
}, {
    question: "Indian played their First ODI Match against _______.",
   choices: ["Pakistan", "Australia", "England", "South africa"],
    correctAnswer: 3
}, {
    question: "Indian played their First T20 Match against _______.",
    choices: ["Pakistan", "Australia", "South Africa", "England"],
    correctAnswer: 3
}, {
    question: "Who was first test captain of Indian cricket team ?",
    choices: ["Bapu Nadkarni", "Ajit Wadekar", "Vijay Hazre", "CK Naydu"],
    correctAnswer: 4	
	
}, {
    question: "Who was first ODI captain of Indian cricket team ?",
    choices: ["CK Nayudu", "Bapu Nadkarni", "Vijay Hazare", "Ajit Wadekar"],
    correctAnswer: 4
}, {
    question: "India won first ODI in ______ against _______.",
    choices: ["1975,East africa", "None of these", "1974, Pakistan", "1974, England"],
    correctAnswer: 1
}, {
    question: "India won first Test in ______ against _______.",
    choices: ["None of these", "1940-41,England", "1951-52,England", "1950-1952,England"],
    correctAnswer: 3

}, {
    question: "India got First Test Series Victory in _______ against _________.",
    choices: ["1952,England", "None of these", "1952,Australia", "1952,Pakistan"],
    correctAnswer: 4

}, {
    question: "India got First Test Series Victory outside the Indian Subcontinent in _______ against _________.",
    choices: ["1952-55,Australia", "1967-68,New Zealand", "None of these", "1954-55,England"],
    correctAnswer: 2

	}, {
    question: "Which of the following is first Indian bowler to take wicket ?",
    choices: ["Imran Khan", "Bapu Nadkarni", "Vyanktesh Prasad", "Mohammad nissar"],
    correctAnswer: 4
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}