// создание HTML разметки
export const createTitle = () => {
  const title = document.createElement('h3');
  title.textContent = 'Todo App';

  return title;
};

const createButton = data => {
  const button = document.createElement('button');
  button.type = data.type;
  button.textContent = data.text;
  button.className = data.className;

  return button;
};

const createButtonCollection = btn => {
  const collectionBtns = {
    submit: {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    reset: {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
    delete: {
      className: 'btn btn-danger me-1',
      type: 'button',
      text: 'Удалить',
    },
    complete: {
      className: 'btn btn-success me-1',
      type: 'button',
      text: 'Завершить',
    },
    edit: {
      className: 'btn btn-secondary btn-edit',
      type: 'button',
      text: 'Редактировать',
    },
  };

  return collectionBtns[`${btn}`];
};

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" name="task"
      placeholder="ввести задачу">
    </label>
  `);

  const dropList = document.createElement('select');

  dropList.classList.add('form-select-lg');
  dropList.setAttribute('name', 'select');
  dropList.style.display = 'none';
  dropList.insertAdjacentHTML(
      'beforeend',
      `
      <option>обычная</option>
      <option>важная</option>
      <option>срочная</option>
  `,
  );

  const submit = createButton(createButtonCollection('submit'));
  const reset = createButton(createButtonCollection('reset'));
  submit.setAttribute('disabled', 'disabled');
  form.append(dropList, submit, reset);

  return form;
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  table.insertAdjacentHTML('beforeend', `
  <thead>
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  </thead>
  `);

  const tbody = document.createElement('tbody');
  table.append(tbody);
  tableWrapper.append(table);

  return {
    tableWrapper,
    tbody,
  };
};

export const createRow = task => {
  const tr = document.createElement('tr');
  tr.classList.add(task.trClass);
  tr.dataset.id = task.id;

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('number');
  tdNumber.textContent = task.number;

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');

  if (task.tdTaskClass) {
    tdTask.classList.add('text-decoration-line-through');
  }
  tdTask.textContent = task.task;

  const tdStatus = document.createElement('td');
  tdTask.classList.add('status');
  tdStatus.textContent = task.status;

  const tdBtns = document.createElement('td');
  const btnDelete = createButton(createButtonCollection('delete'));
  const btnComplete = createButton(createButtonCollection('complete'));
  const btnEdit = createButton(createButtonCollection('edit'));
  if(task.status === 'Выполнена') {
    btnEdit.setAttribute("disabled", "disabled");
  };
  tdBtns.append(btnDelete, btnComplete, btnEdit);
  tr.append(tdNumber, tdTask, tdStatus, tdBtns);

  return tr;
};

export const createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('d-flex', 'align-items-center', 'justify-content-center');

  const modalForm = document.createElement('form');
  modalForm.style.maxWidth = '500px';
  modalForm.style.padding = '20px';
  modalForm.style.backgroundColor = '#e7e5e1';
  modalForm.style.borderRadius = '15px';
  modal.append(modalForm);

  const title = document.createElement('h3');
  title.textContent = 'Здравствуйте, введите своё имя';
  title.style.marginBottom = '30px';

  const label = document.createElement('label');
  label.style.marginRight = '10px';

  label.insertAdjacentHTML('beforeend', `
    <input class="form-control me-5" type="text" name="userName" 
    placeholder="Введите имя">
  `);

  const submit = createButton(createButtonCollection('submit'));
  submit.setAttribute('disabled', 'disabled');
  submit.textContent = 'Отправить';
  modalForm.append(title, label, submit);

  return {
    modal,
    modalForm,
  };
};


