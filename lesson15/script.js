"use strict";
// money Месячный доход* ( Input )
const salaryAmount = document.querySelector('.salary-amount'); 
// Дополнительный доход ( Input ) и ( Button )
const incomeAmounts = document.querySelectorAll('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
// Возможный доход ( Inputs ( collection ))
let inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item');
// Обязательные расходы ( Input ) и ( Button )
const expensesTitle = document.querySelector('.expenses').getElementsByTagName('input')[0];  
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items'); 
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
// Возможные расходы (перечислите через запятую ) ( Input )
const additionalExpensesInput = document.querySelector('.additional_expenses-item');
// депозит в банке ( CheckBox )
const btnCheckboxDeposit = document.querySelector('#deposit-check');
// Цель накопить ( Input )
const targetAmountInput = document.querySelector('.target-amount');
// Период расчета ( Range )
const periodOutValue = document.querySelector('.period-amount');
const rangePeriodSelect = document.querySelector('.period-select');
// Вывод всех значений ( Input ) ( Value )
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];	
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];	
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];	
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];	
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];	
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];	
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];	
// Рассчитать ( Button )
const btnCalculate = document.getElementById('start');
const btnCancel = document.getElementById('cancel');

const allInputsData = document.querySelectorAll('.data input');
const allAppInputs = document.querySelectorAll('input');

// Проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
	constructor() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.income = {}; 
		this.incomeMonth = 0;
		this.addIncome = [];
		this.addExpenses = [];
		this.expensesMonth = 0;
		this.expenses = {};
		this.deposit = false;
		this.persentDeposit = 0;
		this.moneyDeposit = 0;
	}
	checkSalaryAmount() {
		if(salaryAmount.value === '') {
			btnCalculate.disabled = true;
		} else {
			btnCalculate.disabled = false;
		}
	}

	start() {
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
	}

	reset() {
		this.changeStateButtons('block', 'none'); // string 'none' или 'block'
		this.changeStateInputs(false); // boolen true или false
		this.deleteInputs(incomeItems); // '.income-items'
		this.deleteInputs(expensesItems); // '.expenses-items'
		// вернуть в исходное состояние период расчета
		rangePeriodSelect.value = 1;
		periodOutValue.innerHTML = 1;
		// очищаем все инпуты от значений
		allAppInputs.forEach(function(item) {
			if(!item.classList.contains('period-select')) {
				item.value = '';
			}
		});
		// вернуть в исходное состояние кнопки с булиновым типом
		// this.start.disabled = true;
		btnCheckboxDeposit.checked = false;
		btnCalculate.disabled = true;
	}

	// метод функция состояние отображения 2-ух кнопок
	changeStateButtons(displayCalculateBtn, displayCancelBtn) {
		btnCalculate.style.display = displayCalculateBtn;
		btnCancel.style.display = displayCancelBtn;
	}

	// метод функция изменения состояние у всех инпутов в true или false
	changeStateInputs(disableInputsBoolean) {
		// обозначаем все инпуты приложения
			allInputsData.forEach(function(item) {
			if(!item.classList.contains('period-select')) {
				item.disabled = disableInputsBoolean;
			}	
		});
	}

	// метод функция удаление input в Допополнительных и в Обязательх расходах
	// сразу через 2 блока инпутов через 1 переменную одним циклом
	deleteInputs(inputsArrDelete) {
		if (inputsArrDelete.length > 1) {
			for (let i = 1; i < inputsArrDelete.length; i++) {
				inputsArrDelete[i].remove();
			}
		}
	}

	// показываем результат в инпутах
	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
	}

	// добавляем по клику блок с обязательными расходами
	addExpensesBlock() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3) {
			btnPlusExpensesAdd.style.display = 'none';
		}
	}

	getExpenses() {
		const _this = this;
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses !==  '' && cashExpenses !== '') {
				_this.expenses[itemExpenses] = +cashExpenses;
			}
		});
	}
	// добавляем по клику блок дополнительным доходом. 2. Создать метод addIncomeBlock аналогичный addExpensesBlock
	addIncomeBlock() {
		const cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlusIncomeAdd);
		incomeItems = document.querySelectorAll('.income-items');
		if(incomeItems.length === 3) {
			btnPlusIncomeAdd.style.display = 'none';
		}
	}

	// 1. Переписать метод getIncome аналогично getExpenses
	getIncome() {
		const _this = this;
		incomeItems.forEach(function(item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !== '') {
				_this.income[itemIncome] = +cashIncome;
			}
		});
	}

	getAddExpenses() {
		const _this = this;
		// возможные расходы
		let addExpenses = additionalExpensesInput.value.split(',');
	
		addExpenses.forEach(function(item) {
			// обрезаем пробелы
			item = item.trim();
			if(item !== '') {
				_this.addExpenses.push(item);
			}
		});
	}

	getAddIncome() {
		const _this = this;
		inputAdditionalIncomeItems.forEach(function(item) {
			let itemValue = item.value.trim();
			if(item.value !== '') {
				_this.addIncome.push(itemValue);
			}
		});
	}

	// Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += this.expenses[key];
		}
	}

	// Функция возвращает Накопления за месяц (Доходы минус расходы)
	// getAccumulatedMonth переименовать в getBudget 
	getBudget() {
		// appData.budgetMonth - накопления за месяц,appData.budgetDay - накопления за день
		// Округлить вывод дневного бюджета
		this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
		this.budgetDay = (Math.round(this.budgetMonth / 30));
	}

	// Объявить функцию метож getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
	getTargetMonth() {
		const result = Math.ceil(targetAmountInput.value / this.budgetMonth);
		return result;
	}

	// Конструкция условий уровень дохода (расчеты приведены в рублях)
	getStatusincome() {
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
	}

	// Годовой процент дипозита
	getInfoDeposit() {
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
	}

	// Число под полоской (input type range) должно меняться в зависимости от позиции range
	inputChangeValue() {
		periodOutValue.innerHTML = rangePeriodSelect.value;
		let resultValue = periodOutValue.innerHTML;
		return resultValue;
	}

	// метод сколько денег накоплено за период
	calcPeriod() {
		incomePeriodValue.value = this.budgetMonth * +rangePeriodSelect.value;
		return incomePeriodValue.value;
	}
	// События
	addAllEventListeners() {
		btnCalculate.addEventListener('click', this.start.bind(this));
		btnCancel.addEventListener('click', this.reset.bind(this));

		salaryAmount.addEventListener('input', this.checkSalaryAmount);
		btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);
		btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
		rangePeriodSelect.addEventListener('input', this.inputChangeValue.bind(this));
		rangePeriodSelect.addEventListener('input', this.calcPeriod.bind(this));
		
		this.checkSalaryAmount();
	}
}

const appData = new AppData();
appData.addAllEventListeners();