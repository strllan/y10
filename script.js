const totalQuestions = 10;
let currentQuestion = 0;

const progressFill = document.querySelector("#progress-fill");
const progressCount = document.querySelector("#progress-count");
const nextButton = document.querySelector("#next-button");
const redoButton = document.querySelector("#redo-button");

function updateProgress() {
  const percentage = (currentQuestion / totalQuestions) * 100;

  progressFill.style.width = `${percentage}%`;
  progressCount.textContent = `${currentQuestion} / ${totalQuestions}`;
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < totalQuestions) {
    currentQuestion += 1;
    updateProgress();
  }
});

redoButton.addEventListener("click", () => {
  currentQuestion = 0;
  updateProgress();
});

updateProgress();
