// Dom Objects
let addBook = document.querySelector('#add-book');
let contentDiv = document.querySelector('.content');
let formDiv = document.querySelector('.form');
let cancelButton = document.querySelector('#cancel');
let addButton = document.querySelector('#add');

//Dom Object Forms
let titleInput = document.querySelector('#book-title');
let authorInput = document.querySelector('#book-author');
let pagesInput = document.querySelector('#book-pages');

//Event Listeners
addBook.addEventListener("click", showForm);
cancelButton.addEventListener("click", showForm);
addButton.addEventListener("click", addBookToLibrary);

//show form and hide content OR show content and hide form
function showForm() {
    contentDiv.classList.toggle('hidden');
    formDiv.classList.toggle('hidden');
}

//creating and empty array
let myLibrary = [];

//Construtor - Book
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

//add the new book to the end of the array
function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let newBook = new Book (title, author, pages);
    myLibrary.push(newBook);
    clearForm();
    displayBook();
}

//cleares the form and bring back the card div
function clearForm () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    showForm();
}

//obtaining the last item from the array
function displayBook() {
    const display = document.getElementById('cards');
    const books = document.querySelectorAll('.card');
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

//create and display the card
function createBook(item) {
    const card = document.createElement('div');
    const cards = document.querySelector(".cards");
    const titleCard = document.createElement('p');
    const authorCard = document.createElement('p');
    const pagesCard = document.createElement('p');
    const removeButton = document.createElement('button');
    
    card.classList.add('card');
    card.setAttribute('data-attribute', myLibrary.indexOf(item));
    titleCard.textContent = "Title: " + item.title;
    card.appendChild(titleCard);
    
    authorCard.textContent = "Author: " + item.author;
    card.appendChild(authorCard);

    pagesCard.textContent = "Pages: " + item.pages;
    card.appendChild(pagesCard);

    removeButton.classList.add('button');
    removeButton.setAttribute('id', 'remove');
    removeButton.textContent = "Remove";
    card.appendChild(removeButton);

    cards.appendChild(card);

    removeButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        displayBook();
    });
}
    