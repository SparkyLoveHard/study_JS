"use strict";
// Весь функционал что был ранее оставляем
let money; // 30000
let income; // 'фриланс';
let addExpenses; // 'интернет, такси, коммуналка, еда';
let deposit; // true или false
let mission = 70000; // 10000
let period; // 4
let budgetDay; // money / 30;

// Спрашиваем у пользователя “Ваш месячный доход?”
money = +prompt('Ваш месячный доход?');

// Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую”
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');

// Спросить у пользователя Есть ли у вас депозит в банке?
deposit = confirm('Есть ли у вас депозит в банке?');

// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');

// 1. Объявить функцию getExpensesMonth. 
// Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(amount1, amount2) {
	return amount1 + amount2;
}

// 2. Объявить функцию getAccumulatedMonth. 
// Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(money, amount1, amount2) {
	let result = (money - (amount1 + amount2));
	return result;
}

// 3. Объявить переменную accumulatedMonth и 
// присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);

// 4. Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
// зная результат месячного накопления (accumulatedMonth) и возвращаем результат

function getTargetMonth(mission, accumulatedMonth) {
	return Math.ceil(mission / accumulatedMonth);
}

getTargetMonth(mission);

// 5. Удалить из кода переменную budgetMonth

// 6. budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
function getBudgetDay(accumulatedMonth) {
	let result = (Math.round(accumulatedMonth / 30));
	return result; // = (Math.round(accumulatedMonth / 30));
}

// Функция для показа типов Данных
function showTypeOf(data) {
	console.log(data, typeof(data));
}

// Написать конструкцию условий (расчеты приведены в рублях)
function getStatusincome(budgetDay) {
	if(budgetDay > 1200) {
		console.log('У вас высокий уровень дохода');
	} else if(budgetDay > 600 && budgetDay < 1200) {
		console.log('У вас средний уровень дохода');
	} else if (budgetDay < 600 && budgetDay > 0) {
		console.log('К сожалению у вас уровень дохода ниже среднего');
	} else {
		console.log('Что то пошло не так');
	}
	return budgetDay;
}

function getAddExpenses(arrExpenses) {
	let result = [];
	result.push(arrExpenses);
	return arrExpenses;
}


// 7. Почистить консоль логи и добавить недостающие, должны остаться: 

// - Вызовы функции showTypeOf
// console.log(showTypeOf(money));
// console.log(showTypeOf(income));
// console.log(showTypeOf(deposit));

// - Расходы за месяц вызов getExpensesMonth
console.log(getExpensesMonth(amount1, amount2));

// - Вывод возможных расходов в виде массива (addExpenses)
console.log('addExpenses(addExpenses): ', getAddExpenses(addExpenses));

// - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
console.log('getTargetMonth(mission, accumulatedMonth): ', getTargetMonth(mission, accumulatedMonth));

// - Бюджет на день (budgetDay)
console.log('getBudgetDay(accumulatedMonth): ', getBudgetDay(accumulatedMonth));

// - вызов функции getStatusIncome
console.log(getStatusincome(getBudgetDay(accumulatedMonth)));