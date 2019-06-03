var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');
var tentativeItemList = document.querySelector('#tentative-item-list')
var cardsArray = [];
var clearItemsButton = document.querySelector('#clear-button')

pageloadHandler();

cardSection.addEventListener('click', cardSectionHandler);
plusButton.addEventListener('click', tentativeItemHandler);
makeCardButton.addEventListener('click', makeCard);
itemInput.addEventListener('keyup', disableButtonHelper);
titleInput.addEventListener('keyup', makeCardButtonHelper);
tentativeItemList.addEventListener('click', deleteTentativeItem);
clearItemsButton.addEventListener('click', clearButtonHandler);

function populateCards() {
  for (var i = 0; i < cardsArray.length; i++) {
    generateCard(cardsArray[i]);
  }
}

function clearButtonHandler(e) {
  e.preventDefault();
  resetItemInput();
  resetTitleInput();
  clearTaskUl();
  enableMakeButtonUl();
  disableClearAll() 
}

function tentativeItemHandler(e) {
  e.preventDefault();
  var itemId = addItemToArray();
  createTentativeItem(itemInput.value, itemId)
  resetItemInput();
  enableMakeButtonUl();
  disablePlusButton();
} 

function makeCardButtonHelper(e) {
 enableMakeButtonUl();
 disableClearAll();
}

function makeCard(e) {
  e.preventDefault();
  cardInstance(e);
  clearButtonHandler(e);
  noTaskPrompt();
}

function pageloadHandler() {
    cardsArray = JSON.parse(localStorage.getItem('todoListArray')) || [];
    instantiateCards();
    populateCards();
    noTaskPrompt();
}

function disableMakeButton() {
  titleInput.value === '' || itemInput.value === '' ? makeCardButton.disabled = true: makeCardButton.disabled = false;  
}

function disableClearAll() {
  titleInput.value === '' && itemInput.value === '' ? clearItemsButton.disabled = true: clearItemsButton.disabled = false;
}

function enableMakeButtonUl () {
  var item = document.getElementById('tentative-item');
  if (item == undefined || titleInput.value === '') {
    makeCardButton.disabled = true;
  }
  if (item != undefined && titleInput.value !== '') { 
    makeCardButton.disabled = false;
  }
}

function resetItemInput() {
  itemInput.value = '';
}
function resetTitleInput() {
  titleInput.value = '';
}
function clearTaskUl() {
  tentativeItemList.innerHTML = '';
}

function createTodoTask() {
  localStorage.setItem('todoTasks', JSON.stringify([]));
}

function cardInstance(e) {
  e.preventDefault();
  var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  var taskCard = new ToDoList(Date.now(), titleInput.value, todoTasks);
  cardsArray.push(taskCard);
  taskCard.saveToStorage(cardsArray);
  if (localStorage.getItem('todoListArray')) {
    createTodoTask();
    localStorage.removeItem('todoTasks');
  }
  generateCard(taskCard)
}

function createToDoList() {
  var tasksArray = JSON.parse(localStorage.getItem('todoListArray'));
  var newList = new ToDoList(Date.now(), titleInput.value, tasksArray);
  cardsArray.push(newList)
  newList.saveToStorage()
  generateCard(newList);
}

function createTentativeItem(input, id) {
  var tentativeItem = `<li class="tentative-item" id="tentative-item" data-id="${id}"> 
    <img src="images/delete.svg" class="delete-task"> ${input} </li>`
  tentativeItemList.insertAdjacentHTML('beforeend', tentativeItem)
}

function deleteTentativeItem(e) {
  if (e.target.classList.contains("delete-task")) {
    deleteItemFromArray(e);
    var taskToDelete = e.target;
    taskToDelete.parentNode.remove();
    enableMakeButtonUl();
  }
}

function cardSectionHandler(e) {
  deleteTodoCard(e);
  noTaskPrompt();
}

function deleteTodoCard(e) {
  if (e.target.classList.contains('delete-card')) {
    var index = getCardById(e, cardsArray)
    console.log(index)
    cardsArray[index].deleteFromStorage(index)
    e.target.closest('.todo-card').remove();
  }
  noTaskPrompt();
}

function getCardById(e, array) {
  var cardId = e.target.closest('article').getAttribute('data-id');
  console.log('cardId:', cardId)
  var arrayId = array.findIndex(function(arrayObj){
    return arrayObj.id == parseInt(cardId);
});
  return arrayId;
};

function disableButtonHelper (e) {
  e.preventDefault();
  disablePlusButton();
  disableClearAll();
}

function disablePlusButton() {
  itemInput.value === '' ? plusButton.disabled = true: plusButton.disabled = false;
}

function addItemToArray() {
  let todoTasks = [];
  var text = itemInput.value;
  var newTask = new TodoItems(text, Date.now());
  if (localStorage.getItem('todoTasks')) {
    todoTasks = JSON.parse(localStorage.getItem('todoTasks'))
  }
  todoTasks.push(newTask);
  localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  return newTask.id;
}

function deleteItemFromArray(e) {
  if (e.target.className === 'delete-task'){
    var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
    var index = getTaskById(e, todoTasks);
    todoTasks.splice(index, 1)
    reinstantiateTodo(e).saveToStorage(todoTasks)
    e.target.closest('.tentative-item').remove();
  }
}

function getTaskById(e, array) {
  var taskId = e.target.closest('.tentative-item').getAttribute('data-id');
  var arrayId = array.findIndex(function(arrayObj){
    return arrayObj.id == parseInt(taskId);
});
  return arrayId;
};

function reinstantiateTodo(e) {
  var todoInstance = new TodoItems(e.target.closest('li').innerText, e.target.getAttribute('data-id'));
  return todoInstance
}

function instantiateCards() {
  if (JSON.parse(localStorage.getItem('todoListArray')) !== null){
    var reinstantiatedArray = JSON.parse(localStorage.getItem('todoListArray')).map(function(listObject){
      return new ToDoList(listObject.id, listObject.title, listObject.tasks)
    })
    cardsArray = reinstantiatedArray
  }
}

function noTaskPrompt() {
var prompt = document.querySelector('#no-task')
if(cardSection.contains(prompt) && cardsArray.length > 0) {
  cardSection.removeChild(prompt);
}
if(prompt === undefined && cardsArray < 1) {
  var taskPrompt = `<p class="no-task hidden" id="no-task">No Currently Open Task</p>`
  cardSection.insertAdjacentHTML('afterbegin', taskPrompt);
  }
}

  function createTaskList(array) {
    var listItems = ``;
    for(var i = 0; i < array.length; i++) {
      listItems += `<li><img src="images/checkbox.svg" class="unchecked">
        ${array[i].text}
      </li>`
    }
    return listItems;
  };

function generateCard(newTodoCard) {
  var cardItems = createTaskList(newTodoCard.tasksArray);
  let currentList = JSON.parse(localStorage.getItem('todoListArray'))

    var taskCard = `<article class="todo-card" id="todo-card" data-id="${newTodoCard.id}">
    <h2>${newTodoCard.title}</h2>
        <ul class="on-card-tasks on-card-tasks-${newTodoCard.id}">
        ${cardItems}
        </ul>
        <footer>
        <div class="card-image">
        <img src="images/urgent.svg" class="urgent-card">
        <p>URGENT</p>
        </div>
        <div class="card-image">
        <img src="images/delete.svg" class="delete-card">
        <p>DELETE</p>
        </div>
        </footer>
        </article>`
        cardSection.insertAdjacentHTML('afterbegin', taskCard);

};