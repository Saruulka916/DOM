const statusDif = document.getElementById("status");
const bestMs = document.getElementById("best");
const lastMs = document.getElementById("last");
const startMessage = document.getElementById("start");
const messageDif = document.getElementById("message");
const symbolDif = document.getElementById("symbol");
const greyBorder = document.getElementById("grey-border");

let state = "idle";
let timeoutId;
let readyAt = 0;
let bests = null;

const showPanel = (background, text, symbol, message, start) => {
  greyBorder.classList.remove("bg-[#27272A]", "bg-rose-950", "bg-lime-200", "text-[#F4F4F5]", "text-black", "text-[#09090B]");
  greyBorder.classList.add(background, text);

  symbolDif.textContent = symbol;
  messageDif.textContent = message;
  startMessage.textContent = start;
  statusDif.textContent = message;
};

const startAgain = () => {
  state = "waiting";

  showPanel("bg-rose-950", "text-[#F4F4F5]", "…", "Wait for green", "Not yet. Stay ready.");
  timeoutId = setTimeout(
    () => {
      state = "ready";
      showPanel("bg-lime-200", "text-black", "!", "Click now!", "Go, go, go!");
      readyAt = performance.now();
    },
    2000 + Math.random() * 3000,
  );
};

const handleAction = () => {
  if (state === "waiting") {
    clearTimeout(timeoutId);

    state = "result";

    showPanel("bg-[#27272A]", "text-[#F4F4F5]", "↻", "Too soon!", "Click to try again");
  } else if (state === "ready") {
    const milliseconds = Math.round(performance.now() - readyAt);

    bests = !bests ? milliseconds : Math.min(bests, milliseconds);

    lastMs.textContent = `${milliseconds}ms`;
    bestMs.textContent = `${bests}ms`;

    state = "result";

    showPanel("idle", "text-[#F4F4F5]", "✓", `${milliseconds}ms`, "Click to play again");
  } else {
    startAgain();
  }
};

greyBorder.addEventListener("click", handleAction);
