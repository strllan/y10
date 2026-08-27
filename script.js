const totalQuestions = 10;
const initialProgress = 8;
const codePattern = /^\d{5}$/;
let currentQuestion = 0;

const codeGate = document.querySelector("#code-gate");
const codeForm = document.querySelector("#code-form");
const codeInput = document.querySelector("#code-input");
const codeError = document.querySelector("#code-error");
const surveyView = document.querySelector("#survey-view");
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

function getCodeFromUrl() {
  return window.location.hash.replace("#", "").trim();
}

function showSurvey() {
  codeGate.hidden = true;
  surveyView.hidden = false;
  currentQuestion = 0;
  updateProgress();
}

function showCodeGate() {
  codeGate.hidden = false;
  surveyView.hidden = true;
  codeInput.focus();
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

codeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = codeInput.value.trim();

  if (!codePattern.test(code)) {
    codeError.textContent = "Use any 5 digits for now.";
    return;
  }

  codeError.textContent = "";
  window.location.hash = code;
  showSurvey();
});

if (codePattern.test(getCodeFromUrl())) {
  showSurvey();
} else {
  showCodeGate();
}
