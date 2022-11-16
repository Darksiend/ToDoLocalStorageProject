if (getArrayOfToDo()) {
  let todos = getArrayOfToDo();
  todos.forEach((todo) => {
    addToDoToDOM(todo);
    console.log("wo");
  });
}

document.getElementById("form").addEventListener("submit", () => {
  console.log("submitted");
  event.preventDefault();
  getTaskFromInput();
});
console.log(getArrayOfToDo());

document.querySelectorAll("input[type ='text']").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value[0] != input.value[0].toUpperCase()) {
      (input.value = input.value.slice(0, 1).toUpperCase()) +
        input.value.slice(1, input.value.length);
    }
    if (input.value[0] === " ") {
      input.value = "";
    }
  });
});

document.getElementById("input-start-todo").addEventListener("change", () => {
  document.getElementById("input-end-todo").min =
    document.getElementById("input-start-todo").value;
});

function getTaskFromInput() {
  let taskName = document.getElementById("name-of-task-input").value;
  let taskDescription = document.getElementById(
    "description-of-task-input"
  ).value;
  let taskStartDateTime = document.getElementById("input-start-todo").value;
  let taskEndDateTime = document.getElementById("input-end-todo").value;
  console.log(taskEndDateTime);

  let obj = {
    taskName: taskName,
    taskDescription: taskDescription,
    taskStartDateTime: taskStartDateTime,
    taskEndDateTime: taskEndDateTime,
    id: getArrayOfToDo().length,
  };
  putInLocalStorage(obj);
  addToDoToDOM(obj);
  console.log(JSON.stringify(obj, null, 2));
}

function putInLocalStorage(obj) {
  console.log(localStorage.getItem("todos"));
  let todos = JSON.parse(localStorage.getItem("todos") || "[]");
  console.log(todos);
  todos.push(obj);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getArrayOfToDo() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}

function addToDoToDOM(todo) {
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  let todoName = document.createElement("div");
  todoName.classList.add("todo-name");
  todoName.textContent = `${todo.id + 1}.Task Name: ${todo.taskName}`;
  todoItem.setAttribute("id", todo.id);
  let todoDescription = document.createElement("div");
  todoDescription.classList.add("tododescription");
  todoDescription.textContent = `Task description: ${todo.taskDescription}`;
  let todoStart = document.createElement("div");
  todoStart.classList.add("todostartdate");
  todoStart.textContent = `Start Date: ${todo.taskStartDateTime}`;
  let todoEnd = document.createElement("div");
  todoEnd.classList.add("taskEndDateTime");
  todoEnd.textContent = todo.taskEndDateTime;
  todoItem.append(todoName, todoDescription, todoStart, todoEnd);
  document.getElementById("todo-list").append(todoItem);
}

function toggleIsDone() {}
function updateTask() {}
function deleteTask() {}
function taskInLocalStorage() {}
