class ToDoList {
  constructor(id, title, tasksArray){
    this.id = id
    this.title = title
    this.urgent = false;
    this.tasks = tasksArray || [];
  }

  saveToStorage(){
    localStorage.setItem('taskListArray', JSON.stringify(taskListArray));
  }

  deleteFromStorage(){

  }

  updateToDo(){

  }

  updateTask(){

  }
}
