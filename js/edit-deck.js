'use strict';

// check which deck is to be edited, if none redirect
var deckName = getDeckNameFromLocalStorage('edit');
if(!deckName) {
  window.location = 'index.html';
}

// Make sure we have decks loaded
if(allDecks.length === 0) {
  loadDecksIntoAllDecks(amazonStudyCards);
}

// Get the deck we want to edit
var workingDeckIndex = indexOfDeck(deckName);
var editDeck = allDecks[workingDeckIndex];

// populate deck name and description in dom
var deckNameElement = document.getElementById('deck-name');
var deckDescElement = document.getElementById('deck-description');
deckNameElement.textContent = editDeck.deckName;
deckDescElement.textContent = editDeck.deckDescription;

function loadCards() {
  // load cards
  var container = document.getElementById('container');
  var cardsArray = editDeck.deckCards;

  for (let i = 0; i < cardsArray.length; i++) {

    // edit container
    var editContainer = document.createElement('div');
    editContainer.className = 'edit-container';

    // edit card
    var card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', i);

    // card info
    var cardQuestion = document.createElement('p');
    cardQuestion.setAttribute('contentEditable', 'false');
    cardQuestion.className = 'card-question';
    cardQuestion.textContent = cardsArray[i].cardQuestion;
    var cardAnswer = document.createElement('p');
    cardAnswer.setAttribute('contentEditable', 'false');
    cardAnswer.className = 'card-answer';
    cardAnswer.textContent = cardsArray[i].cardAnswer;

    // button container
    var buttonContainer = document.createElement('div');
    buttonContainer.classList = 'button-container';

    // buttons
    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    var saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    saveButton.textContent = 'Save';
    saveButton.setAttribute('data-id', i);
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    var cancelSaveButton = document.createElement('button');
    cancelSaveButton.className = 'cancel-button';
    cancelSaveButton.textContent = 'Cancel';

    // append
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(cancelSaveButton);
    card.appendChild(cardAnswer);
    card.appendChild(cardQuestion);
    editContainer.appendChild(card);
    editContainer.appendChild(buttonContainer);
    container.appendChild(editContainer);

    // add event listeners
    editContainer.addEventListener('mouseover', handleCardHoverStart);
    editContainer.addEventListener('mouseleave', handleCardHoverEnd);
    editButton.addEventListener('click', handleEditClick);
    saveButton.addEventListener('click', handleSaveClick);
    deleteButton.addEventListener('click', handleDeleteClick);
    cancelSaveButton.addEventListener('click', handleCancelSaveClick);
  }
}

// add listener for delete deck
var deleteDeckButton = document.getElementById('delete-deck');
deleteDeckButton.addEventListener('click', handleDeleteDeckClick);

// add listener for confirm delete deck
var confirmDeleteButton = document.getElementById('confirm-delete');
confirmDeleteButton.addEventListener('click', handleConfirmDeleteClick);

// add listener for edit confirmation button in footer
var confirmButton = document.getElementById('confirm-edits');
confirmButton.addEventListener('click', handleConfirmClick);

// event handlers
function handleCardHoverStart() {
  let thisCard = this;
  var buttons = this.children[1];
  buttons.style.display = 'flex';
}

function handleCardHoverEnd() {
  let thisCard = this;
  var buttons = this.children[1];
  buttons.style.display = 'none';
}

function handleEditClick(event) {
  event.stopPropagation();
  let thisEditButton = this;
  let editButtonContainer = this.parentElement;
  let editContainer = event.path[2];
  let deleteButton = editButtonContainer.children[2];
  let cancelButton = editButtonContainer.children[3];
  let card = event.path[2].children[0];
  let cardAnswer = card.children[0];
  let cardQuestion = card.children[1];

  // remove event for mouseleave
  editContainer.removeEventListener('mouseleave', handleCardHoverEnd);

  // show edit container
  editButtonContainer.style.display = 'flex';

  // make inputs editable
  cardAnswer.setAttribute('contentEditable', 'true');
  cardQuestion.setAttribute('contentEditable', 'true');

  // switch edit button to save button
  thisEditButton.style.display = 'none';
  deleteButton.style.display = 'none';
  let id = card.dataset.id;
  let save = document.querySelector(`button[data-id='${id}']`);
  save.style.display = 'inline-block';
  // cancelButton.style.display = 'inline-block';
}

function handleSaveClick(event) {
  event.stopPropagation();
  let saveButton = event.target;
  let card = event.path[2].children[0];
  let id = card.dataset.id;
  let editContainer = event.path[2];
  let deleteButton = this.parentElement.children[2];

  let newAnswer = card.children[0];
  let newQuestion = card.children[1];

  // store new card in deck in memory
  editDeck.editCardFromDeck(id, newQuestion.textContent, newAnswer.textContent);

  // disable inputs
  newAnswer.setAttribute('contentEditable', 'false');
  newQuestion.setAttribute('contentEditable', 'false');

  // hide save button, show edit button
  saveButton.style.display = 'none';
  editContainer.children[1].children[0].style.display = 'inline-block';

  // show delete button again
  deleteButton.style.display = 'inline-block';

  // add event back for mouseleave
  editContainer.addEventListener('mouseleave', handleCardHoverEnd);

  handleFooterDisplay();
}

function handleDeleteClick(event) {
  event.stopPropagation();
  let editContainer = event.path[2];
  let card = event.path[2].children[0];
  let id = card.dataset.id;

  // remove card from dom
  editContainer.parentNode.removeChild(editContainer);

  // remove card from deck in memory
  editDeck.removeCardFromDeck(id);

  handleFooterDisplay();
}

function handleCancelSaveClick(event) {
  event.stopPropagation();
  let editButtonContainer = this.parentElement;
}

function handleConfirmClick() {
  saveDecks();
  localStorage.removeItem('edit');
  window.location = 'index.html';
}

function handleDeleteDeckClick() {
  deleteDeckButton.style.display = 'none';
  confirmDeleteButton.style.display = 'inline-block';
}

function handleConfirmDeleteClick() {
  allDecks.splice(indexOfDeck(editDeck.deckName), 1);
  saveDecks();
  localStorage.removeItem('edit');
  window.location = 'index.html';
}

// handler function to show sticky footer when a card is either edited or deleted (first of either)
function handleFooterDisplay() {
  var footer = document.querySelector('footer');
  footer.style.display = 'flex';
}

// function calls
loadCards();
