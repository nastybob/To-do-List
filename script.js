const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");

let todoList = [];

// load todo list from local storage
if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  displayList();
}

// function to add new task to the list
function addTask() {
  if (input.value.trim()) {
    const newTask = {
      id: Date.now(),
      value: input.value,
      isCompleted: false,
    };
    todoList.push(newTask);
    displayList();
    input.value = "";
  }
}

// function to display list items
function displayList() {
  list.innerHTML = "";
  todoList.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="checkbox" class="task-check" id="${task.id}" ${
      task.isCompleted ? "checked" : ""
    } />
      <label for="${task.id}" class="task ${
      task.isCompleted ? "completed" : ""
    }">${task.value}</label>
      <button class="delete-btn" onclick="deleteTask(${task.id})">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    list.appendChild(listItem);
  });
}

// function to delete task from the list
function deleteTask(id) {
  todoList = todoList.filter((task) => task.id != id);
  displayList();
}

// function to toggle task completion
function toggleCompletion(id) {
  const task = todoList.find((task) => task.id == id);
  task.isCompleted = !task.isCompleted;
  displayList();
}

// add task when user clicks "Add" button or presses "Enter" key
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addTask();
  }
});

// toggle task completion when user clicks checkbox or presses spacebar key
list.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    const taskChecks = document.getElementsByClassName("task-check");
    for (let i = 0; i < taskChecks.length; i++) {
      if (!taskChecks[i].checked) {
        taskChecks[i].checked = true;
        toggleCompletion(taskChecks[i].id);
        break;
      }
    }
  }
});

// save todo list to local storage on page unload
window.addEventListener("unload", () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
});