const questions = [
    {
        question: "What color do you like? 1",
        choices: ["green", "blue", "red", "pink"],
        answer: "green"
    },
    {
        question: "What color do you like? 2",
        choices: ["green", "blue", "red", "pink"],
        answer: "blue"
    },
    {
        question: "What color do you like? 3",
        choices: ["green", "blue", "red", "pink"],
        answer: "red"
    },
    {
        question: "What color do you like? 4",
        choices: ["green", "blue", "red", "pink"],
        answer: "pink"
    }
];

let time = 60;

let timer;

//click start - action
document.querySelector("#start").addEventListener("click", function (event) {
    //start element hide
    document.querySelector("#start-screen").classList.add("hide");
    //show question container
    document.querySelector("#questions").classList.remove("hide");
    //start timer
    timer = setInterval(function () {
        //reduce time
        time--;
        //show time
        document.querySelector("#time").textContent = time;
        //check end time
        if (time <= 0) {
            endGame();
        }
    }, 1000);
    //generate question
    makeQuestion();
})

let qIndex = 0;
function makeQuestion() {
    const question = questions[qIndex];
    //template create
    const template = `
        <h2 id="question-title">${question.question}</h2>
        <div id="choices" class="choices">
            <div class="answer-choice">${question.choices[0]}</div>
            <div class="answer-choice">${question.choices[1]}</div>
            <div class="answer-choice">${question.choices[2]}</div>
            <div class="answer-choice">${question.choices[3]}</div>
        </div>
    `;

    //add template to the page
    document.querySelector("#questions").innerHTML = template;
}

//click ability give
document.querySelector("#questions").addEventListener("click", function (event) {
    if (event.target.className.indexOf("answer-choice") > -1) {
        handleAnswerClick(event);
    }
});

let score = 0;
function handleAnswerClick(event) {
    //check if the answer is correct
    if (questions[qIndex].answer === event.target.textContent) {
        score++;
    } else {
        time -= 5
    }

    //show next question
    qIndex++;

    if (qIndex === questions.length) {
        endGame();
    } else {
        makeQuestion();
    }
}

function endGame() {
    //show end element
    document.querySelector("#end-screen").classList.remove("hide");

    //hide question
    document.querySelector("#questions").classList.add("hide");

    //show score
    document.querySelector("#final-score").textContent = score;
}

document.querySelector("#submit").addEventListener("click", function () {
    const user = document.querySelector("#initials").value;

    const oldData = JSON.parse(localStorage.getItem("data")) || [];

    const userObj = {
        user: user,
        score: score
    };

    oldData.push(userObj);

    localStorage.setItem("data", JSON.stringify(oldData))
});