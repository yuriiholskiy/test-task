const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const date = () => new Date().toLocaleString();
const uuid = () => '_' + Math.random().toString(12).slice(2);
const setToStorage = (key, value) =>
	window.localStorage.setItem(key, JSON.stringify(value));
const getFromStorage = (key) => JSON.parse(window.localStorage.getItem(key));
let tableData = getFromStorage('table-data') || [
	{
		id: uuid(),
		name: 'Whitney',
		surname: 'Welch',
		email: 'hitney@email.com',
		createdAt: date(),
	},
	{
		id: uuid(),
		name: 'John',
		surname: 'Doe',
		email: 'john@email.com',
		createdAt: date(),
	},
	{
		id: uuid(),
		name: 'Stewart',
		surname: 'Boyd',
		email: 'stewart@email.com',
		createdAt: date(),
	},
	{
		id: uuid(),
		name: 'Howard',
		surname: 'Jensen',
		email: 'howard@email.com',
		createdAt: date(),
	},
	{
		id: uuid(),
		name: 'Scarlett',
		surname: 'Hodges',
		email: 'scarlett@email.com',
		createdAt: date(),
	},
];
