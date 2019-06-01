var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');
var tentativeItemList = document.querySelector('#tentative-item-list')



plusButton.addEventListener('click', tentativeItemHandler);
makeCardButton.addEventListener('click', generateCard);
titleInput.addEventListener('keyup', disableMakeButton)
itemInput.addEventListener('keyup', disableMakeButton )
tentativeItemList.addEventListener('click', deleteTentativeItem)

function generateCard(e) {
  e.preventDefault();
  var taskCard = `<article>
        <h2>Title</h2>
        <ul class="on-card-tasks">
          <li>Task Item</li>
          <li>Task Item</li>
        </ul>
        <footer>
          <div class="card-image">
            <img src="images/urgent.svg">
            <p>URGENT</p>
          </div>
          <div class="card-image">
            <img src="images/delete.svg">
            <p>DELETE</p>
          </div>
        </footer>
      </article>`
  cardSection.insertAdjacentHTML('afterbegin', taskCard);
};


function disableMakeButton() {
  titleInput.value === '' || itemInput.value === '' ? makeCardButton.disabled = true: makeCardButton.disabled = false;  
}


function tentativeItemHandler(e) {
  e.preventDefault();
  createTentativeItem(itemInput.value)
} 


function createTentativeItem(input) {
  var tentativeItem = `<li class="tentative-item"> 
    <img src="images/delete.svg" class="delete-task"> ${input} </li>`
  tentativeItemList.insertAdjacentHTML('beforeend', tentativeItem)
}

function deleteTentativeItem(e) {
  if (e.target.classList.contains("delete-task")) {
    var taskToDelete = e.target;
    taskToDelete.parentNode.remove();
  }
}







