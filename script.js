let currentCollection = 1;
let cardId = 1;

function addCard() {
  const title = document.getElementById('cardTitleInput').value;
  const content = document.getElementById('cardContentInput').value;

  const card = createCardElement(title, content);

  const cardContainer = document.getElementById('cardContainer');
  cardContainer.appendChild(card);

  document.getElementById('cardTitleInput').value = '';
  document.getElementById('cardContentInput').value = '';

  cardId++;
}

function createCardElement(title, content) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${cardId}`;

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const contentElement = document.createElement('p');
  contentElement.textContent = content;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editCard(card.id);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteCard(card.id);

  card.appendChild(titleElement);
  card.appendChild(contentElement);
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  return card;
}

function editCard(cardId) {
  const card = document.getElementById(cardId);
  const titleElement = card.querySelector('h3');
  const contentElement = card.querySelector('p');

  const newTitle = prompt('Enter a new title:', titleElement.textContent);
  const newContent = prompt('Enter new content:', contentElement.textContent);

  titleElement.textContent = newTitle;
  contentElement.textContent = newContent;
}

function deleteCard(cardId) {
  const card = document.getElementById(cardId);
  card.remove();
}

function saveCollection() {
  const collectionSelect = document.getElementById('collectionSelect');
  const selectedCollection = collectionSelect.value;

  // Code to save the collection goes here...
  alert(`Collection ${selectedCollection} saved!`);
}

function changeCollection() {
  const collectionSelect = document.getElementById('collectionSelect');
  const selectedCollection = collectionSelect.value;

  // Code to switch to the selected collection goes here...
  alert(`Switched to Collection ${selectedCollection}!`);
}
