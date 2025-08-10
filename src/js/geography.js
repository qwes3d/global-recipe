const questionBox = document.getElementById("question-box");
const optionBox = document.getElementById("option-box");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currentQuestionIndex = 0;

// Load trivia questions from JSON
async function loadQuestions() {
  try {
    const res = await fetch("../src/data/geography.json");
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    questions = await res.json();
    displayQuestion();
  } catch (error) {
    questionBox.textContent = "❌ Error loading trivia questions.";
    console.error(error);
  }
}

// Display a question and its options
function displayQuestion() {
  const current = questions[currentQuestionIndex];
  questionBox.textContent = current.question;
  optionBox.innerHTML = "";

  current.answers.forEach(answer => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("option");
    li.addEventListener("click", () => checkAnswer(answer, current.correct));
    optionBox.appendChild(li);
  });

  feedback.textContent = "";
  nextBtn.style.display = "none";
}

// Check user's answer
function checkAnswer(selected, correct) {
  const options = document.querySelectorAll(".option");

  options.forEach(option => {
    option.style.pointerEvents = "none";
    if (option.textContent === correct) {
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
  });

  feedback.textContent =
    selected === correct
      ? "✅ Correct!"
      : `❌ Wrong! The correct answer is: ${correct}`;

  nextBtn.style.display = "inline-block";
}

// Handle next button click
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showEndMessage();
  }
});

// Show end message
function showEndMessage() {
  questionBox.textContent = "🎉 You've completed the trivia!";
  optionBox.innerHTML = "";
  feedback.textContent = "";
  nextBtn.style.display = "none";
}

// Initialize the trivia app
loadQuestions();
