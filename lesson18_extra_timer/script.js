"use strict";
let timesOfDay = document.getElementById('times-of-day');
let dayofWeek = document.getElementById('timer-day-of-week');
let currentTime = document.getElementById('timer-current-time');
let daysLeft = document.getElementById('timer-days-left');

let dateNow = new Date().getTime();
let dayNow = new Date().getDay();
let hourNow = new Date().getHours();

let timeNow = new Date().toLocaleString('en').substr(11);
let newYearDate = new Date();
let date = new Date();

let arrDayOfWeek = [
    'Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
];

function timer() {
    if (hourNow >= 5 && hourNow < 12) {
        timesOfDay.textContent = "Доброе утро";
    }   
    else if (hourNow >= 12 && hourNow < 18) {
        timesOfDay.textContent = "Добрый день";
    }
    else if (hourNow >= 18 && hourNow < 24) {
        timesOfDay.textContent = "Добрый вечер";
    }
    else if (hourNow >= 0 && hourNow < 5) {
        timesOfDay.textContent = "Доброй ночи";
    }
       
    dayofWeek.textContent = `Сегодня: ${arrDayOfWeek[dayNow]}`;
    currentTime.textContent = `Текущее время ${timeNow}`;

    

    let nextYear = date.getFullYear() + 1;
    newYearDate.setFullYear(nextYear, 0, 1);
    let daysLeftNewYear = Math.ceil((((newYearDate - date.getTime()) / 1000) / 60 / 60) / 24);
    daysLeft.textContent = `До нового года осталось ${daysLeftNewYear} дней`;
}

timer();