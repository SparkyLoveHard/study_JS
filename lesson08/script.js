"use strict";

let money; // 30000

// Проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

// Спрашиваем у пользователя “Ваш месячный доход?”
function start() {
	do {
		money = parseFloat(prompt('Ваш месячный доход?'));
	}
	// Проверка на число
	while(!isNumber(money) || money === null || money === '');
	console.log(money);
}

start();

let appData = {
	income: {}, 
	addExpenses: [], 
	mission: 10000,
	period: 3,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	expenses: {},
	deposit: true,
	persentDeposit: 0,
	moneyDeposit: 0,

	asking: function() {
		if (confirm('Есть ли у вас дополнительный источник зароботка?')) {
			let itemIncome;
			let cashIncome;
			
			// 1. Сделать проверку при получении данных:- 
			// наименование дополнительного источника заработка
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?');
			} while(parseFloat(itemIncome) || itemIncome === null || itemIncome === ''); // string			
			
			do {
				cashIncome = parseInt(prompt('Сколько в месяц вы на этом зарабатываете?')); 
			} while(!isNumber(cashIncome) || itemIncome === null || itemIncome === ''); // number

			appData.income[itemIncome] = cashIncome;
		}

		// 2. Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
		// let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');
		let addExpensesStr;
		// проверяем циклом чтобы пользователь ввел данные тока строку
		do {
			addExpensesStr = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?');
			let arr = addExpensesStr.split(',');
		
			for(let i = 0; i < arr.length; i++) {
				// каждое слово подмассива (стровки)
				let arrStrWord = arr[i];
				let newArrStrWord = arrStrWord.toLowerCase().trim().slice(0, 1).toUpperCase()  + arrStrWord.slice(1);
				appData.addExpenses.push(newArrStrWord);
			}    
		} while(addExpensesStr === '' || parseFloat(addExpensesStr) || addExpensesStr === null);
		
		// Спрашиваем если депозит 
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		
		let sum = 0;
		for (let i = 0; i < 2; i++) {
			// Расходы. Во сколько это обойдется?
			let askExpenses; 
			let amount;
			// 1. Сделать проверку при получении данных:
			// - сумма дополнительного заработка
			// Выполнить. Если условие не выполниться спросить еще раз!
			do {
				askExpenses = prompt('Введите обязательную статью расходов?');
			} while(parseInt(askExpenses) || askExpenses === null || askExpenses === '');

			do {				
				amount = +prompt('Во сколько это обойдется?');  
			} while(!isNumber(amount) );

			appData.expenses[askExpenses] = amount;
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
			console.log('Цель будет достигнута за', result, 'месяц(ев)');
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
	// годовой процент дипозита
	getInfoDeposit: function() {
		if(appData.deposit) {
			// 1. Сделать проверку при получении данных:
			// - годовой процент депозита
			do {
				appData.persentDeposit = parseFloat(prompt('Какой годовой процент?')); // number
			} while(!isNumber(appData.persentDeposit) || appData.persentDeposit === null || appData.persentDeposit === '');
			// - сумма депозита
			do {
				appData.moneyDeposit = parseFloat(prompt('Какая сумма заложена?')); // number
			} while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === null || appData.moneyDeposit === '');
		}
	},
	// метод сколько денег накоплено за период
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	},
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusincome();
appData.calcSavedMoney();
appData.getBudget();


// for(let key in appData) {
// 	console.log('Наша программа включает в себя данные:', key, appData[key]);
// }

console.log(appData.addExpenses);