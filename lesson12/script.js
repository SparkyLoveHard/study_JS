"use strict";
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [
    // {
    //     value: 'Помыть посуду',
    //     completed: true,
    // }
];

function render() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
        <span class="text-todo">${item.value}</span> 
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click', function() {
            // если был true станет false (!item.completed)
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function() {
            //todoData = (todoData.indexOf(item));
            todoData.splice(todoData.indexOf(item), 1);
            localStorage.setItem('plans', JSON.stringify(todoData));
            render();
        });
    });

}

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    // Пустые дела добавляться не должны
    if(headerInput.value !== '') {
        todoData.push(newTodo);
        // headerInput.value
       
        localStorage.setItem('plans', JSON.stringify(todoData));
        

        render();
        // Поле ввода после добавления дела должно очищаться
        headerInput.value = '';
    } else {
        console.log('empty str');
    }


    
});

render();   





    

