document.getElementById("form").addEventListener("submit", () => {
  console.log("submitted");
  event.preventDefault();
  getTaskFromInput();
});

function getTaskFromInput() {
  let taskName = document.getElementById("name-of-task-input").value;
  let taskDescription = document.getElementById(
    "description-of-task-input"
  ).value;
  let taskStartDateTime = document.getElementById("input-start-todo").value;
  console.log(taskStartDateTime);
  let taskEndDateTime = document.getElementById("input-end-todo").value;
  console.log(taskEndDateTime);
  obj = {
    taskName: taskName,
    taskDescription: taskDescription,
    taskStartDateTime: taskStartDateTime,
    taskEndDateTime: taskEndDateTime,
  };

  console.log(JSON.stringify(obj, null, 2));
}
