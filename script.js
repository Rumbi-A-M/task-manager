 const addTaskBtn = document.getElementById("task");
    const deleteBtn = document.getElementById("delete");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("Task");

    addTaskBtn.addEventListener("click", taskAdded);

    function taskAdded() {
      const userInput = taskInput.value.trim();
      if (userInput === "") return;

      const liEle = document.createElement("li");
      liEle.textContent = userInput;

      // Toggle completed on click
      liEle.addEventListener("click", () => {
        liEle.classList.toggle("completed");

        saveTask();
      });

      taskList.appendChild(liEle);
      taskInput.value = ""; // clear input

      saveTasks();
    }

    // Delete completed tasks
    deleteBtn.addEventListener("click", () => {
      const completedTasks = document.querySelectorAll("#Task li.completed");
      completedTasks.forEach(task => task.remove());


    });

    function saveTasks() {
  const taskList = [];
  document.querySelectorAll("#Task li").forEach(li => {
    taskList.push({
      text: li.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;

  const taskList = JSON.parse(saved);
  taskList.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });

    document.getElementById("Task").appendChild(li);
  });
}

// Run this on page load
loadTasks();
