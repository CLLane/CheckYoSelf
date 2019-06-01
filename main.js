var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');
var tentativeItemList = document.querySelector('#tentative-item-list')
var clearItemsButton = document.querySelector('#clear-button')



cardSection.addEventListener('click', cardSectionHandler)
plusButton.addEventListener('click', tentativeItemHandler);
makeCardButton.addEventListener('click', generateCard);
itemInput.addEventListener('keyup', disableButtonHelper)
titleInput.addEventListener('keyup', makeCardButtonHelper)
tentativeItemList.addEventListener('click', deleteTentativeItem)
clearItemsButton.addEventListener('click', clearButtonHandler)


function makeCardButtonHelper() {
 enableMakeButtonUl();
}


function generateCard(e) {
  e.preventDefault();
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


}

function tentativeItemHandler(e) {
  e.preventDefault();
  createTentativeItem(itemInput.value)
  resetItemInput();
  enableMakeButtonUl();
  disablePlusButton();
} 

function createTentativeItem(input) {
  var tentativeItem = `<li class="tentative-item" id="tentative-item"> 
    <img src="images/delete.svg" class="delete-task"> ${input} </li>`
  tentativeItemList.insertAdjacentHTML('beforeend', tentativeItem)
}

function deleteTentativeItem(e) {
  if (e.target.classList.contains("delete-task")) {
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
}

function disablePlusButton() {
  itemInput.value === '' ? plusButton.disabled = true: plusButton.disabled = false;
}






