let clockInterval = null;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let cronometerInterval = null;
let elapsedSeconds = 0;
let now = new Date();

const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const dateElem = document.getElementById("date");

function updateCronometer() {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  hoursElem.textContent = hours.toString().padStart(2, "0");
  minutesElem.textContent = minutes.toString().padStart(2, "0");
  secondsElem.textContent = seconds.toString().padStart(2, "0");
  dateElem.textContent = `${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
}

function start() {
  if (cronometerInterval) return;
  let interval = 1000;
  cronometerInterval = setInterval(function tick() {
    elapsedSeconds++;
    updateCronometer();

    // Aumenta a velocidade suavemente a cada 10 segundos, mas sem saltos grandes
    if (elapsedSeconds % 10 === 0 && interval > 200) {
      interval = Math.max(200, interval - 100); // Reduz 100ms, mínimo 200ms
      clearInterval(cronometerInterval);
      cronometerInterval = setInterval(tick, interval);
    }
  }, interval);
}

function stop() {
  clearInterval(cronometerInterval);
  cronometerInterval = null;
}

function reset() {
  stop();
  elapsedSeconds = 0;
  updateCronometer();
  start(); // Automatically restart after reset
}

function controlCronometer(action) {
  if (action === "start") {
    start();
  } else if (action === "stop") {
    stop();
  } else if (action === "reset") {
    reset();
  } else {
    console.error("Unknown action:", action);
  }
}

// Listen for space key to start the timer
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (cronometerInterval) {
      controlCronometer("stop");
    } else {
      controlCronometer("start");
      e.preventDefault();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start")
    .addEventListener("click", () => controlCronometer("start"));
  document
    .getElementById("stop")
    .addEventListener("click", () => controlCronometer("stop"));
  document
    .getElementById("reset")
    .addEventListener("click", () => controlCronometer("reset"));
  updateCronometer();
  if (dateElem) dateElem.textContent = ""; // Hide date for cronometer
});
