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
// определение порядковых номеров при загрузке страницы согласно данным хранилища
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

    newTask.id = createIdTask();
    newTask.trClass = 'table-light';
    newTask.status = 'В процессе';
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
  list.addEventListener('click', (e) => {
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
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.btn-success')) {
      const id = target.closest('tr').dataset.id;

      target.closest('tr').classList.remove('table-light');
      target.closest('tr').classList.add('table-success');
      target.closest('tr').childNodes[1].classList.add('text-decoration-line-through');
      target.closest('tr').childNodes[2].textContent = 'Выполнена';
      target.closest('tr').lastChild.lastChild.setAttribute('disabled', 'true');

      completeTaskData(id, name);
    }
  });
};
// редактирование задачи
export const editControl = (list, name) => {
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.btn-edit')) {
      const task = document.querySelectorAll('.task');
      const id = target.closest('tr').dataset.id;

      for (const elem of task) {
        if (elem.parentNode.dataset.id === id) {
          elem.setAttribute('contenteditable', 'true');
        }
      }
    }
  });

  list.addEventListener('focusout', e => {
    const target = e.target;
    if (target.closest('.task')) {
      target.closest('.task').setAttribute('contenteditable', 'false');
      const id = target.closest('tr').dataset.id;
      const text = target.closest('.task').textContent;

      editTaskData(id, name, text);
    }
  });
};
