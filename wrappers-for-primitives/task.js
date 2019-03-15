/*jshint esversion: 6*/
'use strict';

function calculateMortgage() {
	// debug
	// window.percent.value = 10;
	// window.contribution.value = 1000;
	// window.amount.value = 20000;
	// window.date.value = '2021-01-11';
	//

    let percent = window.percent.value;
    let contribution = window.contribution.value;
    let amount = window.amount.value;
    let date = window.date.value;

    let result = calculateTotalMortgage(percent, contribution, amount, date);
    let span = window.mortageResult;
    span.textContent = result;
}

function diff_months(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
}

const checkNum = (name, value) => Number.isNaN(parseInt(value)) ? `Параметр "${name}" содержит неправильное значение "${value}". ` : parseInt(value);

function calculateTotalMortgage(percent, contribution, amount, date) {
	const numPercent = checkNum('Процентная ставка', percent);
	if (typeof(numPercent) === 'string') {
		return numPercent;
	}
	const numContribution = checkNum('Начальный взнос', contribution);
	if (typeof(numContribution) === 'string') {
		return numContribution;
	}
	const numAmount = checkNum('Общая стоимость', amount);
	if (typeof(numAmount) === 'string') {
		return numAmount;
	}
	const n = diff_months(new Date(date), new Date());

	const P = percent / 100 / 12;
	const totalSum = n * (amount - contribution) * (P + P / (( Math.pow(1 + P, n) - 1)));
	return totalSum.toFixed(2);
}

function sayHello() {
    let name = window.personName.value;
    let greeting = getGreeting(name);
    let span = window.helloResult;
    span.textContent = greeting;
    console.log(greeting);
}

const getGreeting = (name) => `Привет, мир! Меня зовут ${name.trim() ? name.trim() : 'Аноним'}.`;