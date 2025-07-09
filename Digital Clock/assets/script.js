let clockInterval = null;
const days = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const dateElem = document.getElementById("date");

function updateClock() {
  const now = new Date();
  hoursElem.textContent = now.getHours().toString().padStart(2, "0");
  minutesElem.textContent = now.getMinutes().toString().padStart(2, "0");
  secondsElem.textContent = now.getSeconds().toString().padStart(2, "0");
  dateElem.textContent = `${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
}

function start() {
  if (clockInterval) return;
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

function stop() {
  clearInterval(clockInterval);
  clockInterval = null;
}

function reset() {
  stop();
  hoursElem.textContent = "00";
  minutesElem.textContent = "00";
  secondsElem.textContent = "00";
  setTimeout(start, 1500);
}

function controlClock(action) {
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

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start")
    .addEventListener("click", () => controlClock("start"));
  document
    .getElementById("stop")
    .addEventListener("click", () => controlClock("stop"));
  document
    .getElementById("reset")
    .addEventListener("click", () => controlClock("reset"));
});