const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

window.addEventListener("load", loadTasks);

function addTask(taskText = taskInput.value.trim(), taskDate = dateInput.value, startTime = startTimeInput.value, endTime = endTimeInput.value, ispComleted = false) {
    if (taskText === "" || startTime === "" || endTime === "") {
      alert("Plaese enter All Fields!");
    return;
  }

  const li = document.createElement("li");

  const taskContent = document.createElement("span");
  taskContent.textContent = `${taskText} - ${taskDate} From ${startTime} To ${endTime}`;
  if (ispComleted) taskContent.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskContent.addEventListener("click", () => {
    taskContent.classList.toggle("completed");
    saveTasks();
  });

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const isCompleted = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskParts = task.text.split(" - ");
    const [taskText, taskDateWithTime] = taskParts;
    const [taskDate, timeRange] = taskDateWithTime.split(" From ");
    const [startTime, endTime] = timeRange.split(" To ");
    addTask(taskText, taskDate, startTime, endTime, task.isCompleted);
  });
}

addTaskBtn.addEventListener("click", () => addTask());

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
