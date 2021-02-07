"use strict";

let money; // 30000

// Проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

// Спрашиваем у пользователя “Ваш месячный доход?”
function start() {
	do {
		money = +prompt('Ваш месячный доход?');
	}
	// Проверка на число
	while(!isNumber(money));
}

start();

let appData = {
	income: {}, 
	addExpenses: [], 
	deposit: true,
	mission: 10000,
	period: 3,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	expenses: {},
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');
		appData.addExpenses = addExpenses.toLowerCase().split(',');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		let sum = 0;
		for (let i = 0; i < 2; i++) {
			// Расходы. Во сколько это обойдется?
			let amount;
			let askExpenses = prompt('Введите обязательную статью расходов?');
			
			do {
				// Выполнить. Если условие не выполниться спросить еще раз!
				amount = +prompt('Во сколько это обойдется?');  
				appData.expenses[askExpenses] = amount;
			} while(!isNumber(amount));
			sum += amount;
		}
		return sum;
	},
	
	// Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
		console.log('Расходы за месяц', appData.expensesMonth);
	},

	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	// getAccumulatedMonth переименовать в getBudget 
	getBudget: function() {
		// appData.budgetMonth - накопления за месяц,appData.budgetDay - накопления за день
		appData.budgetMonth = (money - appData.expensesMonth);
		appData.budgetDay = (Math.round(appData.budgetMonth / 30));
	},

	// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
	getTargetMonth: function() {
		let result = Math.ceil(appData.mission / appData.budgetMonth);
		if (result <= 0) {
			console.log('Цель не будет достигнута за месяц') ;
		} else {
			console.log('Цель будет достигнута за', result, 'месяц');
		}
		return result;
	},

	// Написать конструкцию условий (расчеты приведены в рублях)
	getStatusincome: function() {
		if(appData.budgetDay > 1200) {
			console.log('У вас высокий уровень дохода');
		} else if(appData.budgetDay > 600 && appData.budgetDay < 1200) {
			console.log('У вас средний уровень дохода');
		} else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		} else {
			console.log('Что то пошло не так');
		}
		return appData.budgetDay;
	},
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusincome();

for(let key in appData) {
	console.log('Наша программа включает в себя данные:', key);
}