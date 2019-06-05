class TodoItems {
  constructor(text, id) {
    this.text = text;
    this.checked = false;
    this.id = id;
  }

  getFromStorage() {
    var newtodoTasks = JSON.parse(localStorage.getItem('newtodoTasks'));
    return newtodoTasks;
  }

  saveToStorage(updatedArray) {
    localStorage.setItem('todoTasks', JSON.stringify(updatedArray));
  }
}