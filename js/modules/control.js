import {
  removeTaskData,
  completeTaskData,
  editTaskData,
  addTaskData,
} from './serviceStorage.js';
import {createRow} from './createElements.js';
import {renderNumberTask} from './render.js';
// счётчик для определения порядкового номера задачи
const counterMemory = {
  count: 0,
};
// коллекция стилей для строки с задачей
const getTaskStatus = data => {
  const taskParameters = {
    progress: {
      tr: 'table-light',
      status: 'В процессе',
    },
    completed: {
      tr: 'table-success',
      td: 'text-decoration-line-through',
      status: 'Выполнена',
    },
  };

  return taskParameters[`${data}`];
};

// определение порядковых номеров при загрузке
// страницы согласно данным хранилища
export const getCounterData = data => {
  counterMemory.count = data.length;
};
// получение элементов из вёрстки
export const getElem = () => {
  const input = document.querySelector('.form-control');
  const btn = document.querySelector('.btn-primary');

  return {input, btn};
};
// проверка текстового поля на целостность
export const inputDataCheck = (form, dropList) => {
  const {input, btn} = getElem();

  const checkEmptyString = () => {
    if (input.value.trim() !== '') {
      btn.disabled = false;
      if (dropList) {
        dropList.style.display = 'block';
      }
    } else {
      btn.setAttribute('disabled', 'disabled');
      if (dropList) {
        dropList.style.display = 'none';
      }
    }
  };

  form.addEventListener('input', input => {
    checkEmptyString();

    if (input.value === '') {
      checkEmptyString();
    }
  });
};
// получение данных с модального окна
export const modalControl = (modal, e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userName = Object.fromEntries(formData).userName;
  modal.remove();

  return userName;
};
// рандомайзер создания id для задачи
const createIdTask = () => Math.random().toString().substring(2, 10);
// работа со счётчиком номеров
const count = data => {
  if (data) {
    return ++counterMemory.count;
  } else {
    --counterMemory.count;
  }
};
// рендер задачи
const addTaskPage = (task, list) => {
  list.append(createRow(task));
};
// обработка событий формы
export const formControl = (form, list, name) => {
  const {btn} = getElem();
  const dropList = document.querySelector('.form-select-lg');

  inputDataCheck(form, dropList);

  form.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-warning')) {
      btn.setAttribute('disabled', 'disabled');
      dropList.style.display = 'none';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    const taskOption = getTaskStatus('progress');
    newTask.id = createIdTask();
    newTask.trClass = taskOption.tr;
    newTask.status = taskOption.status;
    newTask.number = count(true);
    addTaskPage(newTask, list);
    addTaskData(newTask, name);
    form.reset();
    btn.setAttribute('disabled', 'disabled');
    dropList.style.display = 'none';
  });
};
// удаление задачи
export const deleteControl = (list, name) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-danger')) {
      if (confirm('Вы хотите удалить задачу ?')) {
        target.closest('tr').remove();
        const id = target.closest('tr').dataset.id;

        removeTaskData(id, name);
        renderNumberTask();
        count();
      }
    }
  });
};
// Маркировка выполненной задачи
export const completeControl = (list, name) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const progress = getTaskStatus('progress');
    const completed = getTaskStatus('completed');

    if (target.closest('.btn-success')) {
      const tr = target.closest('tr');
      const id = tr.dataset.id;
      tr.classList.toggle(progress.tr);
      tr.classList.toggle(completed.tr);
      tr.childNodes[1].classList.toggle(completed.td);

      if (tr.classList.contains(completed.tr)) {
        tr.childNodes[2].textContent = completed.status;
        tr.lastChild.lastChild.setAttribute('disabled', 'true');

        completeTaskData(id, name, completed);
      } else {
        tr.childNodes[2].textContent = progress.status;
        tr.lastChild.lastChild.removeAttribute('disabled');

        completeTaskData(id, name, progress);
      }
    }
  });
};
// редактирование задачи
export const editControl = (list, name) => {
  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-edit')) {
      const task = document.querySelectorAll('.task');
      const id = target.closest('tr').dataset.id;
      const btnEdit = target.closest('.btn-edit');

      btnEdit.classList.toggle('btn-secondary');
      btnEdit.classList.toggle('btn-primary');

      if (btnEdit.textContent === 'Редактировать') {
        btnEdit.textContent = 'Сохранить';

        for (const elem of task) {
          if (elem.parentNode.dataset.id === id) {
            elem.setAttribute('contenteditable', 'true');
          }
        }
      } else {
        const getTaskEdit = () => {
          for (const elem of task) {
            if (elem.parentNode.dataset.id === id) {
              elem.setAttribute('contenteditable', 'false');

              return elem.textContent;
            }
          }
        };

        const text = getTaskEdit();
        target.closest('.btn-edit').textContent = 'Редактировать';

        editTaskData(id, name, text);
      }
    }
  });
};
