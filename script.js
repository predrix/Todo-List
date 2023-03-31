"use strict";

const todoForm = document.getElementById("form");
const todoInput = document.getElementById("input");
const todoList = document.getElementById("todo__list");
const editForm = document.getElementById("edit__form");
const editInput = document.getElementById("edit__input");
const curHour = document.getElementById("hour");
const curDate = document.getElementById("date");
const addDate = document.querySelector(".todo__cur-date");
const addHour = document.querySelector(".todo__cur-hour");
let oldInputValue;
const date = new Date();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// ===== date =====

curDate.innerHTML = today.toDateString();

// ===== clock =====

const time = function () {
  const data = new Date();
  let hrs = data.getHours();
  let min = data.getMinutes();
  let sec = data.getSeconds();

  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  curHour.innerHTML = `${hrs}:${min}:${sec}`;
};
setInterval(time, 1000);

// ===== task name =====

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

//===== create task (html) =====

const saveTodo = (text) => {
  const task = `
    <div class="todo__pack">
          <p class="todo__default">${text}</p>
          <span class="todo__cur-date">${curDate.textContent}</span>
          <span class="todo__cur-hour">${curHour.textContent}</span>
          <button id="finish" class="todo__finish">
            <i class="fa-solid fa-check"></i>
          </button>
          <button id="edit" class="todo__edit"><i class="fa-solid fa-pen"></i></button>
          <button id="remove" class="todo__remove">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>`;
  todoList.insertAdjacentHTML("beforeend", task);
  todoInput.value = "";
  todoInput.focus();
};

// ===== choose action =====

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("p"))
    todoTitle = parentEl.querySelector("p").innerText;

  if (targetEl.classList.contains("todo__finish"))
    parentEl.classList.toggle("done");

  if (targetEl.classList.contains("todo__remove")) parentEl.remove();

  if (targetEl.classList.contains("todo__edit")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

// ===== get task name =====

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;
  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

// ===== change task name =====

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo__pack");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("p");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// ===== toogle input =====

const toggleForms = () => {
  editForm.classList.toggle("hidden");
  todoForm.classList.toggle("hidden");
  todoList.classList.toggle("hidden");
};
