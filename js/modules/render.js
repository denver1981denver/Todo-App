import * as create from './createElements.js';
// рендер модального окна
export const renderModal = data => {
  const {modal, modalForm} = create.createModal();
  data.append(modal);

  return {
    modal,
    modalForm,
  };
};
// рендер таблицы задач при загрузке страницы
export const renderTaskRow = (data, elem) => {
  const allTask = data.map(create.createRow);
  elem.append(...allTask);
};
// рендер задачи при её создании
export const renderTaskControl = app => {
  const title = create.createTitle();
  const form = create.createForm();
  const {tableWrapper, tbody} = create.createTable();
  app.append(title, form, tableWrapper);

  return {
    list: tbody,
    form,
  };
};
// рендер порядковых номеров всех задач при удалении задачи
export const renderNumberTask = () => {
  const allNumber = document.querySelectorAll('.number');

  allNumber.forEach((item, i) => {
    item.textContent = ++i;
  });
};


