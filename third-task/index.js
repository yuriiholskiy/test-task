const app = $('#app');
const addTableRowForm = $('#add-table-row-form');
const addBtn = $('#add-btn');
const editBtn = $('#edit-btn');
const deleteSelectedBtn = $('.delete-selected');
let tablesDataIds = [];
let currentRow = null;

const createTableData = (data) => {
	let html = '';
	data.forEach(({ id, name, surname, email, createdAt }) => {
		html += `
			<tr class="table-row" data-id=${id}>
				<td>${name}</td>
				<td>${surname}</td>
				<td>${email}</td>
				<td>${createdAt}</td>
				<td>
					<button data-id=${id} class="btn btn-warning edit">Edit</button>
					<button data-id=${id} class="btn btn-danger delete mt-1 mt-sm-1 mt-md-0">Delete</button>
				</td>
			</tr>
		`;
	});

	return html;
};
const setListenersForDelete = () => {
	const deleteBtns = $$('.delete');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-id');
			tableData = tableData.filter((row) => row.id !== id);
			renderTable(tableData);
		});
	});
};

// update
const setListenersForEdit = () => {
	const editBtns = $$('.edit');
	editBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-id');
			currentRow = tableData.find((row) => row.id === id);
			const { name, surname, email } = currentRow;
			addTableRowForm['name'].value = name;
			addTableRowForm['surname'].value = surname;
			addTableRowForm['email'].value = email;
			addTableRowForm['name'].focus();
			addBtn.classList.add('d-none');
			editBtn.classList.remove('d-none');
		});
	});
};

// select rows
const selectTable = (row) => {
	deleteSelectedBtn.classList.remove('d-none');
	row.classList.toggle('table-active');
	const id = row.getAttribute('data-id');
	if (row.classList.contains('table-active')) {
		tablesDataIds.push(id);
	} else {
		tablesDataIds = tablesDataIds.filter((i) => i !== id);
		// if tablesDataIds empty - hide button
		if (!tablesDataIds.length) {
			deleteSelectedBtn.classList.add('d-none');
		}
	}
};
const setListenersForSelect = () => {
	const rows = $$('.table-row');
	rows.forEach((row) => {
		row.addEventListener('dblclick', () => selectTable(row));
	});
};

deleteSelectedBtn.addEventListener('click', () => {
	tableData = tableData.filter((row) => !tablesDataIds.includes(row.id));
	renderTable(tableData);
	deleteSelectedBtn.classList.add('d-none');
});

// rendering
const renderTable = (data) => {
	app.innerHTML = '';
	if (!data.length) {
		app.innerHTML =
			'<div class="alert alert-primary">Sorry, no data in table</div>';
	} else {
		const template = `<table class="table table-bordered">
			<tr>
				<th>Name</th>
				<th>Surname</th>
				<th>Email</th>
				<th>Date</th>
				<th>Actions</th>
			</tr>
			${createTableData(data)}
			</table>`;
		app.innerHTML = template;
		setToStorage('table-data', tableData);
		setListenersForDelete();
		setListenersForEdit();
		setListenersForSelect();
	}
};
renderTable(tableData);

// add new table row
const upsertRow = (event) => {
	event.preventDefault();

	// add new row
	if (!currentRow) {
		tableData.push({
			id: uuid(),
			name: addTableRowForm['name'].value,
			surname: addTableRowForm['surname'].value,
			email: addTableRowForm['email'].value,
			createdAt: date(),
		});
		// update row
	} else {
		tableData = tableData.map((row) => {
			if (row.id === currentRow.id) {
				row = {
					...row,
					name: addTableRowForm['name'].value,
					surname: addTableRowForm['surname'].value,
					email: addTableRowForm['email'].value,
					createdAt: date(),
				};
			}
			return row;
		});
		addBtn.classList.remove('d-none');
		editBtn.classList.add('d-none');
		currentRow = null;
	}

	renderTable(tableData);
	addTableRowForm.reset();
};
addTableRowForm.addEventListener('submit', upsertRow);
