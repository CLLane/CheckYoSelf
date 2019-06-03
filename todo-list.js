class ToDoList {
  constructor(id, title, tasksArray, urgent){
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasksArray = tasksArray || [];
  }

  saveToStorage(array) {
    console.log('hey');
    localStorage.setItem('todoListArray', JSON.stringify(array));
  }

  deleteFromStorage(index) {
   cardsArray.splice(index, 1);
    this.saveToStorage(cardsArray);
  }

  updateToDo(array) {
  console.log('urgent:', this.urgent)
  this.urgent = !this.urgent;
  console.log('urgent:', this.urgent)
  this.saveToStorage(array);
  }

  updateTask() {

  }
}

class TodoItems {
  constructor(text, id) {
    this.text = text;
    this.checked = false;
    this.id = id;
  }

  getFromStorage() {
    var newtodoTasks = JSON.parse(localStorage.getItem('newtodoTasks'));
    return newtodoTasks
  }

  saveToStorage(updatedArray) {
    localStorage.setItem('todoTasks', JSON.stringify(updatedArray));

  }

}