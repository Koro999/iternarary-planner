let currentCollection = 1;
let cardId = 1;

// Load saved cards on page load
window.onload = function () {
  const savedCards = localStorage.getItem('cards');
  if (savedCards) {
    const parsedCards = JSON.parse(savedCards);
    parsedCards.forEach(card => {
      const { title, content } = card;
      const cardElement = createCardElement(title, content);
      const cardContainer = document.getElementById('cardContainer');
      cardContainer.appendChild(cardElement);
      cardId++;
    });
  }
}

function addCard() {
  const title = document.getElementById('cardTitleInput').value;
  const content = document.getElementById('cardContentInput').value;

  const card = createCardElement(title, content);

  const cardContainer = document.getElementById('cardContainer');
  cardContainer.appendChild(card);

  document.getElementById('cardTitleInput').value = '';
  document.getElementById('cardContentInput').value = '';

  cardId++;

  saveCards(); // Save the updated cards
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

  saveCards(); // Save the updated cards
}

function deleteCard(cardId) {
  const card = document.getElementById(cardId);
  card.remove();

  saveCards(); // Save the updated cards
}

function saveCards() {
  const cards = [];
  const cardContainer = document.getElementById('cardContainer');
  const cardElements = cardContainer.getElementsByClassName('card');

  for (let i = 0; i < cardElements.length; i++) {
    const cardElement = cardElements[i];
    const titleElement = cardElement.querySelector('h3');
    const contentElement = cardElement.querySelector('p');

    const card = {
      title: titleElement.textContent,
      content: contentElement.textContent
    };

    cards.push(card);
  }

  localStorage.setItem('cards', JSON.stringify(cards));
}
