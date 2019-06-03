class ToDoList {
  constructor(id, title, tasksArray){
    this.id = id;
    this.title = title;
    this.urgent = false;
    this.tasksArray = tasksArray || [];
  }

  saveToStorage(array) {
    localStorage.setItem('todoListArray', JSON.stringify(array));
  }

  deleteFromStorage(index) {
   cardsArray.splice(index, 1);
   console.log(index)
   this.saveToStorage(cardsArray);
  }

  updateToDo() {

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