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
let btnCancel = document.getElementById('cancel');

let allInputsData = document.querySelectorAll('.data input');
let allAppInputs = document.querySelectorAll('input');

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
	deposit: false,
	persentDeposit: 0,
	moneyDeposit: 0,
	// mission: 30000,
	// period: 3,

	start: function () {
		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.calcPeriod();
		this.checkSalaryAmount();
		this.showResult();
		this.changeStateButtons('none', 'block'); // string 'none' или 'block'
		this.changeStateInputs(true); // boolen true или false
	},

	reset: function() {
		this.changeStateButtons('block', 'none'); // string 'none' или 'block'
		this.changeStateInputs(false); // boolen true или false
		this.deleteInputs(incomeItems); // '.income-items'
		this.deleteInputs(expensesItems); // '.expenses-items'
		// вернуть в исходное состояние период расчета
		rangePeriodSelect.value = 1;
		periodOutValue.innerHTML = 1;
		// очищаем все инпуты от значений
		allAppInputs.forEach(function(item) {
			item.value = '';
		});
		// вернуть в исходное состояние кнопки с булиновым типом
		this.start.disabled = true;
		btnCheckboxDeposit.checked = false;
		btnCalculate.disabled = true;
	},

	// метод функция состояние отображения 2-ух кнопок
	changeStateButtons: function(displayCalculateBtn, displayCancelBtn) {
		btnCalculate.style.display = displayCalculateBtn;
		btnCancel.style.display = displayCancelBtn;
	},
	// метод функция изменения состояние у всех инпутов в true или false
	changeStateInputs: function(disableInputsBoolean) {
		// обозначаем все инпуты приложения
			allInputsData.forEach(function(item) {
			if(!item.classList.contains('period-select')) {
				item.disabled = disableInputsBoolean;
			}	
		});
	},
	// метод функция удаление input в Допополнительных и в Обязательх расходах
	// сразу через 2 блока инпутов через 1 переменную одним циклом
	deleteInputs: function (inputsArrDelete) {
		if (inputsArrDelete.length > 1) {
			for (let i = 1; i < inputsArrDelete.length; i++) {
				inputsArrDelete[i].remove();
			}
		}
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
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = +cashIncome;
			}
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
		// Округлить вывод дневного бюджета
		this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
		this.budgetDay = (Math.round(this.budgetMonth / 30));
	},

	// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
	getTargetMonth: function() {
		let result = Math.ceil(targetAmountInput.value / this.budgetMonth);
		return result;
	},
	// Конструкция условий уровень дохода (расчеты приведены в рублях)
	getStatusincome: function() {
		if(this.budgetDay > 1200) {
			console.log('У вас высокий уровень дохода');
		} else if(this.budgetDay > 600 && this.budgetDay < 1200) {
			console.log('У вас средний уровень дохода');
		} else if (this.budgetDay < 600 && this.budgetDay > 0) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		} else {
			console.log('Что то пошло не так');
		}
		return this.budgetDay;
	},
	// Годовой процент дипозита
	getInfoDeposit: function() {
		if(this.deposit) {
			// 1. Сделать проверку при получении данных:
			// - годовой процент депозита
			do {
				this.persentDeposit = parseFloat(prompt('Какой годовой процент?')); // number
			} while(!isNumber(this.persentDeposit) || this.persentDeposit === null || this.persentDeposit === '');
			// - сумма депозита
			do {
				this.moneyDeposit = parseFloat(prompt('Какая сумма заложена?')); // number
			} while(!isNumber(this.moneyDeposit) || this.moneyDeposit === null || this.moneyDeposit === '');
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
		incomePeriodValue.value = appData.budgetMonth * +rangePeriodSelect.value;
		return appData.budgetMonth * +rangePeriodSelect.value;
	},

	checkSalaryAmount: function() {
		if(salaryAmount.value === '') {
			btnCalculate.disabled = true;
		} else {
			btnCalculate.disabled = false;
		}
	}
};

// События
// Событие для кнопки рассчитать
btnCalculate.addEventListener('click', appData.start.bind(appData));
// Событие для кнопки скинуть все значения и вернуть программу в исходное состояние
btnCancel.addEventListener('click', appData.reset.bind(appData));

btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
rangePeriodSelect.addEventListener('input', appData.inputChangeValue);
rangePeriodSelect.addEventListener('input', appData.calcPeriod);
appData.checkSalaryAmount();
salaryAmount.addEventListener('input', appData.checkSalaryAmount);