document.getElementById("form").addEventListener("submit", () => {
  console.log("submitted");
  event.preventDefault();
  getTaskFromInput();
});

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
  };

  console.log(JSON.stringify(obj, null, 2));
}

function putInLocalStorage(obj) {}
function toggleIsDone() {}
function updateTask() {}
function deleteTask() {}
function taskInLocalStorage() {}
