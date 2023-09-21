const addBtn = document.getElementById("addTodoBtn");
const todoInput = document.getElementById("todoInput");
const notodos = document.getElementById("notodos");
const noTodosMessage = document.getElementById("noTodosMessage");

// Add event listener to the "Add" button
addBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let todoContainer = todoInput.value.trim();

  if (todoContainer !== "") {
    const li = document.createElement('div');
    li.className = "task-item";
    li.innerHTML = `
      <span class = "TaskItems">${todoContainer}</span>
      <button class="btn-remove" onclick="removeTask(this)">&times;</button>
    `;
    notodos.appendChild(li);
    todoInput.value = "";

    // Update local storage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(todoContainer);
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // Hide the "No todos currently" message
    noTodosMessage.style.display = "none";
  }
});

// Function to remove a task
function removeTask(button) {
  const li = button.parentElement;
  li.remove();

  // Update local storage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = li.querySelector("span").innerText;
  const updatedTodos = savedTodos.filter(todo => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  // Show the "No todos currently" message if there are no tasks left
  if (notodos.children.length === 0) {
    noTodosMessage.style.display = "block";
  }
}

// Load saved todos from local storage on page load
function loadSavedTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  if (savedTodos.length > 0) {
    savedTodos.forEach(todo => {
      const li = document.createElement('div');
      li.className = "task-item";
      li.innerHTML = `
        <span>${todo}</span>
        <button class="btn-remove" onclick="removeTask(this)">&times;</button>
      `;
      notodos.appendChild(li);
    });
  } else {
    noTodosMessage.style.display = "block";
  }
}

// Call the function to load saved todos on page load
loadSavedTodos();
