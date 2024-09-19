const questions = [
  {
    question: "In what year did World War II end?",
    answers: [
      { text: "1945", correct: true },
      { text: "1955", correct: false },
      { text: "1946", correct: false },
      { text: "1942", correct: false },
    ],
  },
  {
    question: "What Renaissance artist painted the Sistine Chapel ceiling?",
    answers: [
      { text: "Albania", correct: false },
      { text: "Malta", correct: false },
      { text: "Michelangelo", correct: true },
      { text: "Brunei", correct: false },
    ],
  },
  {
    question: "What is the largest lake in the world?",
    answers: [
      { text: "Caspian Sea", correct: false },
      { text: "Baikal", correct: true },
      { text: "Lake Superior", correct: false },
      { text: "Ontario", correct: false },
    ],
  },
  {
    question: "Which planet in the solar system is known as the “Red Planet”?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "Who wrote the novel “War and Peace”?",
    answers: [
      { text: "Anton Chekhov", correct: false },
      { text: "Fyodor Dostoevsky", correct: false },
      { text: "Leo Tolstoy", correct: true },
      { text: "Ivan Turgenev", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Seoul", correct: false },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world?",
    answers: [
      { text: "Nile", correct: true },
      { text: "Mississippi", correct: false },
      { text: "Amazon", correct: false },
      { text: "Yangtze", correct: false },
    ],
  },
  {
    question: "What gas is used to extinguish fires?",
    answers: [
      { text: "Hydrogen", correct: false },
      { text: "Carbon dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Oxygen", correct: false },
    ],
  },
];

const questionElements = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currQueIndex = 0;
let score = 0;

function startQuiz() {
  currQueIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currQueIndex];
  let questionNo = currQueIndex + 1;
  questionElements.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElements.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currQueIndex++;
  if (currQueIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currQueIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
