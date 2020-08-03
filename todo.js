const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // toDos array

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // change Object to String
}

function paintToDo(text) {
  const li = document.createElement("li"); // create li
  const delBtn = document.createElement("button"); // create Delete Button
  const span = document.createElement("span"); // create span
  const newId = toDos.length + 1;

  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;
  li.appendChild(span); // make span li's child
  li.appendChild(delBtn); // make delBtn li's child
  li.id = newId;
  toDoList.appendChild(li); // make li toDoList's child

  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);

  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // Delete Value
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    const parsedToDos = JSON.parse(loadedtoDos); // Parsing String to Object
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
