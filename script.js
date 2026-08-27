const totalQuestions = 10;
const initialProgress = 8;
let currentQuestion = 0;

const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressCount = document.querySelector("#progress-count");
const nextButton = document.querySelector("#next-button");
const redoButton = document.querySelector("#redo-button");

function getLogarithmicProgress() {
  const curveStrength = 0.188705;
  const currentValue = Math.log1p(currentQuestion * curveStrength);
  const maxValue = Math.log1p(totalQuestions * curveStrength);

  return initialProgress + (currentValue / maxValue) * (100 - initialProgress);
}

function updateProgress() {
  const progress = getLogarithmicProgress() / 100;

  progressTrack.style.setProperty("--progress", progress);
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
