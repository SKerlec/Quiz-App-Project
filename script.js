const STORE = [
    {
        question: 'Louisiana was the ____ state to join the U.S.',
        answers: [
            '5th',
            '15th',
            '18th',
            '8th'
        ],
        correctAnswer:
            '18th'
    },
    {
        question: 'Louisiana is also known as the _________.',
        answers: [
            'Gumbo State',
            'Pelican State',
            'Mosquito State',
            'Boot State'
        ],
        correctAnswer:
            'Pelican State'
    },
    {
        question: 'What is Louisiana\'s state flower?',
        answers: [
            'Water Lily',
            'Red Rose',
            'Daisy',
            'Magnolia'
        ],
        correctAnswer:
            'Magnolia'
    },
    {
        question: 'What is Louisiana\'s state capitol?',
        answers: [
            'New Orleans',
            'Abita Springs',
            'Shreveport',
            'Baton Rouge'
        ],
        correctAnswer: 
            'Baton Rouge'
    },
    {
        question: 'What is Louisiana\'s state Bird?',
        answers: [
            'Mosquito',
            'Brown Pelican',
            'Bald Eagle',
            'Peacock'
        ],
        correctAnswer:
            'Brown Pelican'
    }
];

let score = 0;
let questionNumber = 0;

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return questionLayout(questionNumber);
    } else {
        $('.questions-page').hide();
        finalScore();
        $('.question-num').text(5);
    }
}

function resetNums() {
    score = 0;
    questionNumber = 0;
    $('.score-num').text(0);
    $('.question-num').text(0);
}

function newScore() {
    score++;
    $('.score-num').text(score);
}

function newQuestionNum() {
    questionNumber++;
    $('.question-num').text(questionNumber + 1);
}

function startQuiz() {
    $('.alt-box').hide();
    $('.center-box').on('click', '.start-button', function(event) {
        $('.start-page').hide();
        $('.question-num').text(1);
        $('.questions-page').show();
        $('.questions-page').prepend(generateQuestion());
    });
}

function submitAnswer() {
    $('.center-box').on('submit', function(event) {
        event.preventDefault();
        $('.alt-box').hide();
        $('.feedback-page').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

function questionLayout(questionIndex) {
    let formMaker = $(`<form>
            <fieldset>
                <legend class="questionText">${STORE[questionIndex].question}</legend>
            </fieldset>
        </form>`)
    let questionSelector = $(formMaker).find('fieldset');
    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
            $(`<label class="progress-nums" for="${answerIndex}">
                <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
                    <span>${answerValue}</span>
                </input>
            </label>`).appendTo(questionSelector);
    });
    $(`<button type="submit" class="submit-answer button">Submit Answer</button>`).appendTo(questionSelector);
    return formMaker;
}

function correctAnswer() {
    $('.feedback-page').html(
        `<h2>That's Right!</h2>
        <img src="correct-img.png" class="pics" alt="Happy Mardi-Gras Mask" width="200px">
        <button type="button" class="next-question button">Next!</button>`
    );
    newScore();
}

function wrongAnswer() {
    $('.feedback-page').html(
        `<h2>...Wrong...</h2>
        <img src="wrong-img.png" class="pics" alt="Hurrican Shape" width="200px">
        <p>The correct answer is...</p>
        <p>${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="next-question button">Next!</button>`
    );
}

function nextQuestion() {
    $('.center-box').on('click', '.next-question', function(event) {
        $('.alt-box').hide();
        $('.questions-page').show();
        newQuestionNum();
        $('.questions-page form').replaceWith(generateQuestion());
    });
}

function finalScore() {
    $('.results-page').show();
    $('.results-page').html(`
    <h2>You answered <br>
    ${score}/5 <br>
    correct!
    </h2>
    <button type="submit" class="restart-quiz button">Geaux Again?</button>`
    );
}

function restartQuiz() {
    $('.center-box').on('click', '.restart-quiz', function(event) {
        event.preventDefault();
        $('.alt-box').hide();
        resetNums();
        $('.start-page').show();
    });
}

function runQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

runQuiz();