class ToDoList {
  constructor(id, title, tasksArray, urgent){
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasksArray = tasksArray || [];
  }

  saveToStorage(array) {
    localStorage.setItem('todoListArray', JSON.stringify(array));
  }

  deleteFromStorage(index) {
   cardsArray.splice(index, 1);
    this.saveToStorage(cardsArray);
  }

  updateToDo(array) {
  this.urgent = !this.urgent;
  this.saveToStorage(array);
  }

  updateTask(index) {
  this.tasksArray[index].checked = !this.tasksArray[index].checked
  this.saveToStorage(cardsArray)
  }
}

