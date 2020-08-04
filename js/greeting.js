const nameContainer = document.querySelector(".js-name");

function paintInput() {
  const input = document.createElement("input");
  input.placeholder = "당신의 이름은 무엇인가요?";
  input.type = "text";
  input.className = "name__input";

  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);

  nameContainer.appendChild(form);
}

function paintName(name) {
  nameContainer.innerHTML = "";

  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `${name}님 좋은 하루 되세요.`;

  nameContainer.appendChild(title);
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value;

  localStorage.setItem("username", value); // Save Name
  paintName(value); // Display Name
}

function LoadName() {
  const name = localStorage.getItem("username");
  if (name === null) {
    paintInput();
  } else {
    paintName(name);
  }
}

function init() {
  LoadName();
}

init();
