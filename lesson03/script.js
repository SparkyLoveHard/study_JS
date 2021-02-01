"use strict";
// 1 Часть. Весь функционал что был ранее оставляем
let money; // 30000
let income; // 'фриланс';
let addExpenses; // 'интернет, такси, коммуналка, еда';
let despoit; // true или false
let mission = 70000; // 10000
let period; // 4
let budgetDay; // money / 30;

// 2 Часть. Спрашиваем у пользователя “Ваш месячный доход?”
money = +prompt('Ваш месячный доход?');

// 3 Часть. Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую”
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');

// 4 Часть. Спросить у пользователя Есть ли у вас депозит в банке?
despoit = confirm('Есть ли у вас депозит в банке?');
console.log('despoit: ', despoit);

// 5 Часть. Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');

// 6 Часть. Вычислить бюджет на месяц, учитывая обязательные расходы
let budgetMounth = money - (amount1 + amount2);
console.log('budgetMounth: ', budgetMounth);

// 7 Часть. Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission
let missionMounthComplete = Math.ceil((budgetMounth * 12) / mission); 
console.log('missionMounthComplete: ', missionMounthComplete);

// 8 Часть. Поправить budgetDay учитывая бюджет на месяц, а не месячный доход.
budgetDay = budgetMounth / 30;
console.log('budgetDay: ', budgetDay);

// 9 Часть. Написать конструкцию условий (расчеты приведены в рублях)

if(budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if(budgetDay > 600 && budgetDay < 1200) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}