const $ = (selector) => document.querySelector(selector);
const restForm = $('#rest-form');
const restMoneyMessage = $('.rest-money-message');
restForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const sumValue = +restForm['sum'].value;
	const priceValue = +restForm['price'].value;
	const rest = (sumValue - priceValue).toFixed(2);
	const parsed = rest.split('.');
	let messageContent = '';
	if (sumValue < priceValue) {
		messageContent = `Price is higher than the sum`;
	} else {
		let dollars =
			+parsed[0] === 0 || +parsed[0] < 0 ? '' : parsed[0] + ' dollars,';
		let cents =
			+parsed[1] === 0 || +parsed[1] < 0
				? ''
				: parsed[1].replace(/^0/, '') + ' cents';
		messageContent = `Your rest is ${dollars} ${cents}.
		(by nominal value of ${dollars} ${getNominalValues(+parsed[1])})`;
	}

	restMoneyMessage.textContent = messageContent;
});
// find all possible nominal values
function getNominalValues(num) {
	let nominalValues = {};

	for (let i = 1; i < 60; i++) {
		nominalValues[i] = `${i} cents`;
		if (i < 5) {
			nominalValues[i] = `1 cents `.repeat(i);
		}
		if (i < 10 && i > 5) {
			nominalValues[i] = '5 cents, ' + `1 cents `.repeat(i - 5);
		}
		if (i < 15 && i > 10) {
			nominalValues[i] = '10 cents, ' + `1 cents `.repeat(i - 10);
		}
		if (i === 15) {
			nominalValues[i] = '10 cents, 5 cents';
		}
		if (i < 20 && i > 15) {
			nominalValues[i] = '10 cents, 5 cents, ' + '1 cents, '.repeat(i - 10 - 5);
		}
		if (i < 25 && i > 20) {
			nominalValues[i] =
				'10 cents, 10 cents, ' + '1 cents, '.repeat(i - 10 - 10);
		}
		if (i < 30 && i > 25) {
			nominalValues[i] = '25 cents, ' + '1 cents, '.repeat(i - 25);
		}
		if (i < 35 && i > 30) {
			nominalValues[i] = '25 cents, 5 cents, ' + '1 cents, '.repeat(i - 25 - 5);
		}
		if (i < 40 && i > 35) {
			nominalValues[i] =
				'25 cents, 10 cents, ' + '1 cents, '.repeat(i - 25 - 10);
		}
		if (i < 45 && i > 40) {
			nominalValues[i] =
				'25 cents, 10 cents, 5 cents, ' + '1 cents, '.repeat(i - 25 - 10 - 5);
		}
		if (i < 50 && i > 45) {
			nominalValues[i] =
				'25 cents, 10 cents, 10 cents, ' + '1 cents, '.repeat(i - 25 - 10 - 10);
		}
		if (i < 55 && i > 50) {
			nominalValues[i] = '50 cents, ' + '1 cents, '.repeat(i - 50);
		}
		if (i < 60 && i > 55) {
			nominalValues[i] = '50 cents, 5 cents, ' + '1 cents, '.repeat(i - 50 - 5);
		}
	}
	return nominalValues[num].replace(/, $/, '.');
}
