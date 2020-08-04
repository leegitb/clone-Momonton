const form = document.querySelector(".js-to-do"),
  input = document.querySelector(".js-add-to-do"),
  list = document.querySelector(".js-list");

let toDos = [];

function loadToDos() {
  const loadedtoDos = localStorage.getItem("toDos");
  if (loadedtoDos !== null) {
    const parsedToDos = JSON.parse(loadedtoDos); // Parsing String to Object
    parsedToDos.forEach((toDo) => {
      addToDo(toDo.value);
    });
  }
  return;
}

function addToDo(text) {
  const toDo = document.createElement("li"); // create toDo li
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;

  const deleteBtn = document.createElement("span"); // create Delete Button
  deleteBtn.innerText = "X";
  deleteBtn.className = "toDo__button";
  deleteBtn.addEventListener("click", handledelete);

  const label = document.createElement("label"); // create label
  label.innerHTML = text;

  toDo.appendChild(deleteBtn); // make deleteBtn toDo's child
  toDo.appendChild(label); // make label toDo's child
  list.appendChild(toDo);

  saveToDo(text);
}

function persistToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos)); // change Object to String
}

function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text,
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handledelete(event) {
  const target = event.target;
  const li = target.parentNode;
  const ul = li.parentNode;

  const toDoId = li.id;
  ul.removeChild(li);

  toDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

function handleSubmit(event) {
  event.preventDefault();

  const value = input.value;
  input.value = ""; // Delete Value
  addToDo(value);
}

function init() {
  loadToDos();
}

form.addEventListener("submit", handleSubmit);

init();
