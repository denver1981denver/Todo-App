import {getTaskData} from './modules/serviceStorage.js';
import * as render from './modules/render.js';
import {
  formControl,
  deleteControl,
  completeControl,
  editControl,
  modalControl,
  getCounterData,
  inputDataCheck,
} from './modules/control.js';

const init = () => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');

  const {modal, modalForm} = render.renderModal(app);
  inputDataCheck(modalForm);

  modalForm.addEventListener('submit', e => {
    const userName = modalControl(modal, e);
    const {list, form} = render.renderTaskControl(app);
    const dataBase = getTaskData(userName);

    getCounterData(dataBase);
    render.renderTaskRow(dataBase, list);
    formControl(form, list, userName);
    deleteControl(list, userName);
    completeControl(list, userName);
    editControl(list, userName);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

