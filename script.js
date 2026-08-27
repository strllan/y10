const totalQuestions = 10;
const initialProgress = 8;
const codePattern = /^\d{5}$/;
let currentQuestion = 0;

const codeGate = document.querySelector("#code-gate");
const codeForm = document.querySelector("#code-form");
const codeEntry = document.querySelector("#code-entry");
const codeInput = document.querySelector("#code-input");
const codeError = document.querySelector("#code-error");
const codeSlots = document.querySelectorAll(".code-slot");
const surveyView = document.querySelector("#survey-view");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressCount = document.querySelector("#progress-count");
const nextButton = document.querySelector("#next-button");
const redoButton = document.querySelector("#redo-button");

function cleanIndexUrl() {
  const isWebPage = window.location.protocol === "http:" || window.location.protocol === "https:";

  if (isWebPage && window.location.pathname.endsWith("/index.html")) {
    const cleanPath = window.location.pathname.replace(/index\.html$/, "");
    window.history.replaceState(null, "", `${cleanPath}${window.location.search}${window.location.hash}`);
  }
}

function getLogarithmicProgress() {
  const curveStrength = 0.188705;
  const currentValue = Math.log1p(currentQuestion * curveStrength);
  const maxValue = Math.log1p(totalQuestions * curveStrength);

  return initialProgress + (currentValue / maxValue) * (100 - initialProgress);
}

function getCodeFromUrl() {
  return window.location.hash.replace("#", "").trim();
}

function getCleanCode(value) {
  return value.replace(/\D/g, "").slice(0, 5);
}

function renderCodeSlots() {
  const code = codeInput.value;

  codeSlots.forEach((slot, index) => {
    slot.textContent = code[index] || "_";
  });
}

function updateHashFromCode() {
  const code = getCleanCode(codeInput.value);
  codeInput.value = code;
  renderCodeSlots();

  if (code) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${code}`);
  } else {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function fillCodeFromUrl() {
  const code = getCleanCode(getCodeFromUrl());
  codeInput.value = code;
  renderCodeSlots();
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

codeInput.addEventListener("input", () => {
  codeError.textContent = "";
  updateHashFromCode();

  if (codePattern.test(codeInput.value)) {
    showSurvey();
  }
});

window.addEventListener("hashchange", () => {
  if (!codeGate.hidden) {
    fillCodeFromUrl();
  }
});

codeEntry.addEventListener("click", () => {
  codeInput.focus();
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

cleanIndexUrl();
fillCodeFromUrl();
showCodeGate();
