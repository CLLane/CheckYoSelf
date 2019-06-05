var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');
var tentativeItemList = document.querySelector('#tentative-item-list')
var cardsArray = [];
var clearItemsButton = document.querySelector('#clear-button')
var searchBar = document.querySelector('#search-input')
var filterUrgentButton = document.querySelector('#filter-button')

pageloadHandler();

cardSection.addEventListener('click', cardSectionHandler);
plusButton.addEventListener('click', tentativeItemHandler);
makeCardButton.addEventListener('click', makeCard);
itemInput.addEventListener('keyup', disableButtonHelper);
titleInput.addEventListener('keyup', makeCardButtonHelper);
tentativeItemList.addEventListener('click', deleteTentativeItem);
clearItemsButton.addEventListener('click', clearButtonHandler);
searchBar.addEventListener('keyup', searchFunction);
filterUrgentButton.addEventListener('click', filterUrgentHandler)


function populateCards(array) {
  for (var i = 0; i < array.length; i++) {
    generateCard(array[i]);
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
    populateCards(cardsArray);
    noTaskPrompt();
}

function cardSectionHandler(e) {
  enableDeleteButton(e);
  urgentToggle(e);
  checkTasks(e);
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


function deleteTodoCard(e) {
  if (e.target.classList.contains('delete-card')) {
    var index = getCardById(e, cardsArray)
    cardsArray[index].deleteFromStorage(index)
    e.target.closest('.todo-card').remove();
  }
  noTaskPrompt();
}

function getCardById(e, array) {
  var cardId = e.target.closest('article').getAttribute('data-id');
  var arrayIndex = array.findIndex(function(arrayObj){
    return arrayObj.id === parseInt(cardId);
});
  return arrayIndex;
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
  var todoTasks = [];
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
  var arrayIndex = array.findIndex(function(arrayObj){
    return arrayObj.id == parseInt(taskId);
});
  return arrayIndex;
};

function reinstantiateTodo(e) {
  var todoInstance = new TodoItems(e.target.closest('li').innerText, e.target.getAttribute('data-id'));
  return todoInstance
}

function instantiateCards() {
  if (cardsArray.length > 0) {
    var reinstantiatedArray = JSON.parse(localStorage.getItem('todoListArray')).map(function(listObject){
      return new ToDoList(listObject.id, listObject.title, listObject.tasksArray, listObject.urgent)
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
    var checked = checkedOrNot(array[i]);
      listItems += `<li data-id="${array[i].id}" class="${checked}"><img src="images/checkbox.svg" class="unchecked">
        ${array[i].text}
      </li>`
    }
    return listItems;
  };

function generateCard(newTodoCard) {
  var cardItems = createTaskList(newTodoCard.tasksArray);
  var currentList = JSON.parse(localStorage.getItem('todoListArray'))
  var urgent = urgentCheck(newTodoCard);
  var taskCard = `<article class="todo-card ${urgent}" id="todo-card" data-id="${newTodoCard.id}">
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
        <img src="images/delete.svg" class="delete-card" disable>
        <p>DELETE</p>
        </div>
        </footer>
        </article>`
        cardSection.insertAdjacentHTML('afterbegin', taskCard);

};


function urgentToggle(e) {
  if (e.target.classList.contains('urgent-card')) {
    urgentCardChange(e);
    var index = getCardById(e, cardsArray)
    cardsArray[index].updateToDo(cardsArray);
    instantiateCards();
  }
}

function urgentCardChange(e) {
  e.target.closest('article').classList.toggle('urgent')
}

function urgentCheck(newTodoCard) {
  if (newTodoCard.urgent) {
    return 'urgent'
  }
}


function checkTasks(e) {
  if(e.target.classList.contains('unchecked')) {
    checkTasksChange(e);
    checkedCheck(e);
  }
}

function checkTasksChange(e) {
  e.target.closest('li').classList.toggle('checked')
}

function checkedCheck(e) {
 var index = getCardById(e, cardsArray);
 var taskObj = cardsArray[index].tasksArray
 var taskId = e.target.closest('li').getAttribute('data-id')
 var taskIndex = taskObj.findIndex(function(itemObj){
  return itemObj.id == parseInt(taskId);
 });
 cardsArray[index].updateTask(taskIndex);
}

function checkedOrNot(array) {
  if(array.checked === true){
    return 'checked'
  }
}


function enableDeleteButton(e) {
  var index = getCardById(e, cardsArray);
  var deleteObj = cardsArray[index].tasksArray;
  var newArray = deleteObj.filter(function(itemObj){
    return itemObj.checked === true;
  });
  if (newArray.length === deleteObj.length){
    deleteTodoCard(e);
  } 
}

// ------Search Function----------\\


function searchFunction(arrayName) {
  if (searchBar.value === '' || null) {
    emptySearchPopulation();
  }
  if (filterUrgentButton.clicked === true) {
    cardSection.innerHTML = '';
    populateCards(searchArray(urgentArray(), searchBar.value));
} else {
  var newArray = searchArray(cardsArray, searchBar.value);
  cardSection.innerHTML = ''
  populateCards(newArray);
}
}

function emptySearchPopulation(){
  cardSection.innerText = '';
  populateCards(cardsArray);
}


function searchArray(array, searchWords){
  var searchResultsArray = array.filter(function(arrayObject){
  return arrayObject.title.includes(searchWords) === true;
  });
  return searchResultsArray;
}

// -----------Filter Urgent----------

function filterUrgentHandler() {
  cardSection.innerHTML = '';
  urgentButtonStyle();
  urgentCardsArray();
}

function urgentButtonStyle() {
  filterUrgentButton.classList.toggle('active');
  filterUrgentButton.clicked = !filterUrgentButton.clicked;
}

function urgentCardsArray(){
    if (filterUrgentButton.clicked === true){
    var urgent = urgentArray();
    populateCards(urgent)
  }
   else {
    populateCards(cardsArray)
  }
}

function urgentArray(){
  var urgentArray = cardsArray.filter(function(arrayObj){
    return arrayObj.urgent === true;
  })
  return urgentArray;
}