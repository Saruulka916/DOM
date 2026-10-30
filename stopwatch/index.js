const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const startButton = document.getElementById("start-button");
const state = document.getElementById("state");
const displaySeconds = document.getElementById("seconds");
const displayMinute = document.getElementById("minutes");
const displayHours = document.getElementById("hours");

let intervalId;
let startTime = 0;

const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((startTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(startTime / 3600)
    .toString()
    .padStart(2, "0");

  displaySeconds.textContent = seconds;
  displayMinute.textContent = minutes;
  displayHours.textContent = hours;
};

const stopTimer = () => {
  clearInterval(intervalId);
  stopButton.disabled = true;
  state.textContent = "Paused";
  startButton.disabled = false;
  startButton.textContent = "Resume";
};

const resetTimer = () => {
  clearInterval(intervalId);
  stopButton.disabled = false;
  state.textContent = "Ready";
  startTime = 0;
  formatTime(startTime);
  startButton.disabled = false;
  resetButton.disabled = true;
  startButton.textContent = "Start";
};

const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);

  stopButton.disabled = false;
  resetButton.disabled = false;
  startButton.disabled = true;
  state.textContent = "Running";
};

stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
