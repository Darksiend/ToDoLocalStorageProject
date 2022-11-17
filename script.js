if (getArrayOfToDo()) {
  let todos = getArrayOfToDo();
  todos.forEach((todo) => {
    addToDoToDOM(todo);
  });
}

document.getElementById("form").addEventListener("submit", (event) => {
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
    isDone: false,
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
  // todoStart.textContent = `Start Date: ${todo.taskStartDateTime}`;
  let todoEnd = document.createElement("div");
  todoEnd.classList.add("taskEndDateTime");
  daysToEnd = getCurrentDateTime(todo.taskEndDateTime);
  todoEnd.textContent = `Days to end: ${daysToEnd}`;
  if (isNaN(daysToEnd)) {
    todoEnd.textContent = ``;
  }
  let doneBtn = document.createElement("button");
  doneBtn.textContent = "Not Done:(";
  doneBtn.classList.add("todo-item-btn");
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete this task";
  deleteBtn.onclick = deleteTask;
  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.value = "Edit";
  editBtn.onclick = editTask;
  editBtn.textContent = "Edit";
  if (todo.isDone == true) {
    doneBtn.style.backgroundColor = "Green";
    doneBtn.textContent = "Done:)";
  } else if (todo.isDone == false) {
    doneBtn.style.backgroundColor = "Red";
  }
  doneBtn.onclick = toggleIsDone;

  todoItem.append(
    todoName,
    todoDescription,
    todoStart,
    todoEnd,
    doneBtn,
    deleteBtn,
    editBtn
  );

  document.getElementById("todo-list").append(todoItem);
}

function toggleIsDone(event) {
  let todoId = event.path[1].id;
  getArrayOfToDo()[todoId];
  let arrOfTodos = JSON.parse(localStorage.todos);
  arrOfTodos.forEach((todo) => {
    if (todo.id == todoId) {
      todo.isDone = !todo.isDone;
      console.log("changed");
      if (todo.isDone == true) {
        event.target.style.backgroundColor = "Green";
      }
      localStorage.setItem("todos", JSON.stringify(arrOfTodos));
    }
  });
  console.log(event.target);

  console.log(JSON.stringify(arrOfTodos));
  updateDom();
}
function updateDom() {
  clearToDoList();

  getArrayOfToDo().forEach((todo) => {
    addToDoToDOM(todo);
  });
}
function deleteTask(event) {
  let arrOfToDos = getArrayOfToDo();
  let index;
  console.log(event.path[1].id);

  for (let i = 0; i < arrOfToDos.length; i++) {
    console.log(arrOfToDos[i].id);
    if (arrOfToDos[i].id == event.path[1].id) {
      arrOfToDos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(arrOfToDos));
      console.log("deleted");
    }
  }

  updateDom();
}

function clearToDoList() {
  let toDoList = document.getElementById("todo-list");
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
}
let editId;
let nameOfEditTask;
let descOfEditTask;
function editTask() {
  document.getElementById("edit-task").style.display = "flex";
  editId = event.path[1].id;
  getArrayOfToDo().forEach((todo) => {
    if (todo.id == editId) {
      nameOfEditTask = todo.taskName;
      descOfEditTask = todo.taskDescription;
    }
  });
  document.getElementById("edit-todo-name-input").value = nameOfEditTask;
  document.getElementById("edit-todo-description-input").value = descOfEditTask;
}

function okEditing() {
  let editedTaskName = document.getElementById("edit-todo-name-input").value;
  let editedTaskDescription = document.getElementById(
    "edit-todo-description-input"
  ).value;
  let arrOfToDos = getArrayOfToDo();
  arrOfToDos.forEach((todo) => {
    if (todo.id == editId) {
      todo.taskName = editedTaskName;
      todo.taskDescription = editedTaskDescription;
      localStorage.setItem("todos", JSON.stringify(arrOfToDos));
      updateDom();
    }
  });

  document.getElementById("edit-task").style.display = "none";
}

function cancelEditing() {
  document.getElementById("edit-task").style.display = "none";
}

function getCurrentDateTime(date) {
  let endDate = new Date(date);
  let currentDate = Date.now();
  return Math.floor((endDate - currentDate) / 1000 / 60 / 60 / 24);
}
