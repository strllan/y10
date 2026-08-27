const totalQuestions = 23;
let currentQuestion = 0;

const progressFill = document.querySelector("#progress-fill");
const progressCount = document.querySelector("#progress-count");
const nextButton = document.querySelector("#next-button");
const redoButton = document.querySelector("#redo-button");

function getLogarithmicProgress() {
  const curveStrength = 0.35;
  const currentValue = Math.log1p(currentQuestion * curveStrength);
  const maxValue = Math.log1p(totalQuestions * curveStrength);

  return (currentValue / maxValue) * 100;
}

function updateProgress() {
  const progress = getLogarithmicProgress() / 100;

  progressFill.style.transform = `scaleX(${progress})`;
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
