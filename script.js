 const addTaskBtn = document.getElementById("task");
const deleteBtn = document.getElementById("delete");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Add task with button click
addTaskBtn.addEventListener("click", taskAdded);

// Add task with Enter key
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") taskAdded();
});

function taskAdded() {
  const userInput = taskInput.value.trim();
  if (userInput === "") return;

  renderTask(userInput);
  taskInput.value = "";
  saveTasks();
}

function renderTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  taskList.appendChild(li);
}

deleteBtn.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll("#task-list li.completed");
  completedTasks.forEach(task => task.remove());
  saveTasks(); // Fix: Update localStorage
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;

  const taskArray = JSON.parse(saved);
  taskArray.forEach(task => renderTask(task.text, task.completed));
}

loadTasks();
