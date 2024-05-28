document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => renderTodoItem(todo));

  // Add a new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      const todo = { id: Date.now(), text: todoText };
      todos.push(todo);
      renderTodoItem(todo);
      todoInput.value = '';
      saveTodos();
    }
  });

  // Render a todo item
  function renderTodoItem(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  }

  // Handle edit and delete actions
  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      todos = todos.filter(todo => todo.id !== id);
      todoList.removeChild(li);
      saveTodos();
    } else if (e.target.classList.contains('edit')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      const todo = todos.find(todo => todo.id === id);
      const newText = prompt('Edit todo', todo.text);
      if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        li.querySelector('span').textContent = newText.trim();
        saveTodos();
      }
    }
  });

  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
