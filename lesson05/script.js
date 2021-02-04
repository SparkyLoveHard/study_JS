"use strict"; //
// Весь функционал что был ранее оставляем
let money; // 30000
let income; // 'фриланс';
let addExpenses; // 'интернет, такси, коммуналка, еда';
let deposit; // true или false
let mission = 10000; // 10000
let period; // 4
let budgetDay; // money / 30;

// Проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

// Спрашиваем у пользователя “Ваш месячный доход?”
// 1. Переписать функцию start циклом do while
function start() {
	do {
		money = +prompt('Ваш месячный доход?');
	}
	// Проверка на число
	while(!isNumber(money));
}

start();

// Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую”
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');

// Спросить у пользователя Есть ли у вас депозит в банке?
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

// 2. Добавить проверку что введённые данные являются числом, которые мы получаем на вопрос 
//'Во сколько это обойдется?’ в функции getExpensesMonth
// Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
		// Расходы. Во сколько это обойдется?
		let amount;

		do {
			// Выполнить. Если условие не выполниться спросить еще раз!
			expenses[i] = prompt('Введите обязательную статью расходов?');
			amount = +prompt('Во сколько это обойдется?');  
		} while(!isNumber(amount));
		sum += amount;
    }
    console.log(expenses);
    console.log(sum);
    return sum;
}

let expensesAmount = getExpensesMonth();

// Объявить функцию getAccumulatedMonth. 
// Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(money, expensesAmount) {
	let result = (money - expensesAmount);
	return result;
}

// Объявить переменную accumulatedMonth и 
// присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

// 3.Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
// зная результат месячного накопления (accumulatedMonth) и возвращаем результат
// Если getTargetMonth возвращает нам отрицательное значение, то вместо 
// “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
function getTargetMonth(mission, accumulatedMonth) {
	let result = Math.ceil(mission / accumulatedMonth);
	if (result <= 0) {
		console.log('Цель не будет достигнута');
	} else {
		console.log('Цель будет достигнута');
	}
	return result;
}

getTargetMonth(mission, accumulatedMonth);

// budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
function getBudgetDay(accumulatedMonth) {
	let result = (Math.round(accumulatedMonth / 30));
	return result; // = (Math.round(accumulatedMonth / 30));
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

// - Вывод возможных расходов в виде массива (addExpenses)
console.log('addExpenses(addExpenses): ', getAddExpenses(addExpenses));