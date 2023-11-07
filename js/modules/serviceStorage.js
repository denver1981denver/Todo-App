// Получение данных из локального хранилища
export const getTaskData = name => (localStorage.getItem(name) ?
  JSON.parse(localStorage.getItem(name)) : []);
// Отправка данных в локальное хранилище
const setTaskData = (data, name) => {
  localStorage.setItem(name, JSON.stringify(data));
};
// Добавление задачи в локальное храниилще
export const addTaskData = (data, name) => {
  const dataBase = getTaskData(name);
  dataBase.push(data);

  setTaskData(dataBase, name);
};
// удаление задачи в локальном хранилище
export const removeTaskData = (id, name) => {
  const data = getTaskData(name);
  const newData = data.filter(item => item.id !== id);
  newData.forEach((item, i) => {
    item.number = ++i;
  });

  setTaskData(newData, name);
};
// пометка выполненной задачи локальном хранилище
export const completeTaskData = (id, name) => {
  const data = getTaskData(name);

  data.forEach((item) => {
    if (item.id === id) {
      item.trClass = 'table-success';
      item.tdTaskClass = 'text-decoration-line-through';
      item.status = 'Выполнена';
    }
  });

  setTaskData(data, name);
};
// редактирование задачи в локальном хранилище
export const editTaskData = (id, name, text) => {
  const data = getTaskData(name);

  data.forEach((item) => {
    if (item.id === id) {
      item.task = text;
    }
  });

  setTaskData(data, name);
};

