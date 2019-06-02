var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');
var tentativeItemList = document.querySelector('#tentative-item-list')
var cardsArray = [];
var clearItemsButton = document.querySelector('#clear-button')

pageloadHandler();


cardSection.addEventListener('click', cardSectionHandler)
plusButton.addEventListener('click', tentativeItemHandler);
makeCardButton.addEventListener('click', makeCard);
itemInput.addEventListener('keyup', disableButtonHelper)
titleInput.addEventListener('keyup', makeCardButtonHelper)
tentativeItemList.addEventListener('click', deleteTentativeItem)
clearItemsButton.addEventListener('click', clearButtonHandler)


function makeCardButtonHelper(e) {
 enableMakeButtonUl();
 disableClearAll();
}

function populateCards() {
  for (var i = 0; i < cardsArray.length; i++) {
    generateCard(cardsArray[i]);
  }
}

function pageloadHandler() {
  checkArray(cardsArray);
  populateCards();
  createTodoTask();

}

function createTodoTask() {
  localStorage.setItem('todoTasks', JSON.stringify([]));
}

function makeCard(e) {
  cardInstance(e);
  clearButtonHandler(e);
}

function checkArray(array) {
  if(JSON.parse(localStorage.getItem('todoListArray')) === null) {
    return;
  } else {
    var newArray = JSON.parse(localStorage.getItem('todoListArray')).map(function(array) {
      return new ToDoList(Date.now(), titleInput.value, newArray);
    });
    cardsArray = newArray;
  }
}

function cardInstance(e) {
  e.preventDefault();
  var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  var taskCard = new ToDoList(Date.now(), titleInput.value, todoTasks);
  cardsArray.push(taskCard);
  taskCard.saveToStorage(cardsArray);
  generateCard(e, taskCard)

}


function generateCard(taskObj) {
  var taskCard = `<article class="todo-card">
        <h2>Title</h2>
        <ul class="on-card-tasks">
          <li>Task Item</li>
          <li>Task Item</li>
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



function createTentativeItem(input, id) {
  var tentativeItem = `<li class="tentative-item" id="tentative-item" data-id="${id}""> 
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
}

function deleteTodoCard(e) {
  if (e.target.classList.contains('delete-card')) {
    var taskToDelete = e.target;
    e.target.closest('.todo-card').remove();

  }
}

function disableButtonHelper (e) {
  e.preventDefault();
  disablePlusButton();
  disableClearAll();
}

function disablePlusButton() {
  itemInput.value === '' ? plusButton.disabled = true: plusButton.disabled = false;
}


function addItemToArray() {
  var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  var text = itemInput.value;
  var newTask = new TodoItems(text, Date.now());
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

