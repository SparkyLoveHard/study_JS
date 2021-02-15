"use strict";
// money Месячный доход* ( Input )
let salaryAmount = document.querySelector('.salary-amount'); 
// Дополнительный доход ( Input ) и ( Button )
let incomeAmounts = document.querySelectorAll('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
// Возможный доход ( Inputs ( collection ))
let inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item');
// Обязательные расходы ( Input ) и ( Button )
let expensesTitle = document.querySelector('.expenses').getElementsByTagName('input')[0];  
let expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items'); 
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
// Возможные расходы (перечислите через запятую ) ( Input )
let additionalExpensesInput = document.querySelector('.additional_expenses-item');
// депозит в банке ( CheckBox )
let btnCheckboxDeposit = document.querySelector('#deposit-check');
// Цель накопить ( Input )
let targetAmountInput = document.querySelector('.target-amount');
// Период расчета ( Range )
let periodOutValue = document.querySelector('.period-amount');
let rangePeriodSelect = document.querySelector('.period-select');
// Вывод всех значений ( Input ) ( Value )
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];	
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];	
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];	
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];	
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];	
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];	
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];	
// Рассчитать ( Button )
let btnCalculate = document.getElementById('start');

// Проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {	
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	income: {}, 
	incomeMonth: 0,
	addIncome: [],
	addExpenses: [],
	expensesMonth: 0, 
	expenses: {},
	deposit: true,
	persentDeposit: 0,
	moneyDeposit: 0,
	// mission: 30000,
	// period: 3,
	// Спрашиваем у пользователя “Ваш месячный доход?”
	start: function () {
		appData.budget = +salaryAmount.value;
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		appData.calcPeriod();

		appData.checkSalaryAmount();

		appData.showResult();
	},
	// показываем результат в инпутах
	showResult: function() {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		
		incomePeriodValue.value = appData.calcPeriod();
	},

	// добавляем по клику блок с обязательными расходами
	addExpensesBlock: function() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3) {
			btnPlusExpensesAdd.style.display = 'none';
		}
	},

	getExpenses: function() {
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses !==  '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = +cashExpenses;
			}
			// console.log(expensesItems);
		});
	},
	// добавляем по клику блок дополнительным доходом. 2. Создать метод addIncomeBlock аналогичный addExpensesBlock
	addIncomeBlock: function() {
		let cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
		incomeItems = document.querySelectorAll('.income-items');
		if(incomeItems.length === 3) {
			btnPlusIncomeAdd.style.display = 'none';
		}
	},
	// 1. Переписать метод getIncome аналогично getExpenses
	getIncome: function() {
		incomeItems.forEach(function(item) {
			// console.log(item);
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = +cashIncome;
			}
			// console.log(incomeItems);
		});
	},

	getAddExpenses: function() {
		// возможные расходы
		let addExpenses = additionalExpensesInput.value.split(',');

		addExpenses.forEach(function(item) {
			// обрезаем пробелы
			item = item.trim();
			if(item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},

	getAddIncome: function() {
		inputAdditionalIncomeItems.forEach(function(item) {
			let itemValue = item.value.trim();
			if(item.value !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	},
	
	// Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
		// console.log('Расходы за месяц', appData.expensesMonth);
	},

	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	// getAccumulatedMonth переименовать в getBudget 
	getBudget: function() {
		// appData.budgetMonth - накопления за месяц,appData.budgetDay - накопления за день
		// 3. Округлить вывод дневного бюджета
		appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
		appData.budgetDay = (Math.round(appData.budgetMonth / 30));
	},

	// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
	getTargetMonth: function() {
		let result = Math.ceil(targetAmountInput.value / appData.budgetMonth);
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
	// Число под полоской (input type range) должно меняться в зависимости от позиции range
	inputChangeValue: function() {
		periodOutValue.innerHTML = rangePeriodSelect.value;
		let resultValue = periodOutValue.innerHTML;
		return resultValue;
	}, 
	// метод сколько денег накоплено за период
	calcPeriod: function() {
		incomePeriodValue.value = appData.budgetMonth * rangePeriodSelect.value;
		return appData.budgetMonth * rangePeriodSelect.value; // appData.budgetMonth * rangePeriodSelect.value;
	},

	checkSalaryAmount: function() {
		if(salaryAmount.value === '') {
			btnCalculate.disabled = true;
		} else {
			btnCalculate.disabled = false;
		}
	}
};

// incomePeriodValue
// События

btnCalculate.addEventListener('click', appData.start);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
rangePeriodSelect.addEventListener('input', appData.inputChangeValue);
// Добавить обработчик события внутри метода showResult, который будет отслеживать период
rangePeriodSelect.addEventListener('input', appData.calcPeriod);
// Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, проверку поля
appData.checkSalaryAmount();
salaryAmount.addEventListener('input', appData.checkSalaryAmount);