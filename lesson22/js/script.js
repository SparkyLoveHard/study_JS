/* eslint-disable linebreak-style */
'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `				
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
              <button class="todo-remove"></button>
              <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            console.log([...this.todoData]);
            this.input.value = '';
            this.render();
        } else {
            alert('Пустое дело добавить нельзя!');
            return;
        }
    }

    deleteItem(event) {
        let target = event.target;

        let targetClosestItem = target.closest('.todo-item');

        if (target.matches('.todo-remove')) {
            this.todoData.forEach(elem => {
                if (elem.key === targetClosestItem.key) {
                    this.todoData.delete(elem.key);
                    targetClosestItem.remove();
                }
            });
            this.render();
        }
    }

    completedItem(event) {
        let target = event.target;

        let targetClosestItem = target.closest('.todo-item');

        if (target.closest('.todo-complete')) {
            if (target.closest('.todo-completed')) {
                this.todoList.append(targetClosestItem);
                this.todoData.forEach(function(elem) {
                    if (elem.key === targetClosestItem.key) {
                        elem.completed = false;
                    }
                });
            } else if (target.closest('.todo-list')) {
                this.todoCompleted.append(targetClosestItem);
                this.todoData.forEach(function(elem) {
                    console.log(elem.key);
                    if (elem.key === targetClosestItem.key) {
                        elem.completed = true;
                    }
                });
            }
            this.render();
        }

    }


    handler() {
        document.querySelector('.todo-container').addEventListener('click', this.completedItem.bind(this));
        document.querySelector('.todo-container').addEventListener('click', this.deleteItem.bind(this));
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render(); 
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.handler();
todo.init();
