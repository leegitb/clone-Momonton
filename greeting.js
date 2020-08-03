const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_ON = "showing";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue); // Display Name
  saveName(currentValue); // Save Name
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function askForName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello ${text}`;
}

function LoadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  LoadName();
}
init();
