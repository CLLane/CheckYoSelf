var cardSection = document.querySelector('#card-section');
var plusButton = document.querySelector('#plus-button');
var titleInput = document.querySelector('#title-input');
var itemInput = document.querySelector('#item-input');
var makeCardButton = document.querySelector('#make-button');

// plusButton.addEventListener('click', );
makeCardButton.addEventListener('click', generateCard);
titleInput.addEventListener('keyup', disablePlusButton)
itemInput.addEventListener('keyup', disablePlusButton )

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


function disablePlusButton() {
  titleInput.value === '' || itemInput.value === '' ? plusButton.disabled = true: plusButton.disabled = false;  
}
