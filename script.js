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
let statusInput = document.querySelector('#status');

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
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

//add the new book to the end of the array
function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let status = getStatus();
    let newBook = new Book (title, author, pages, status);
    myLibrary.push(newBook);
    clearForm();
    displayBook();
}

//establishes either the input is checked or not by the user
function getStatus() {
    if(statusInput.checked) return true;
    else return false;
}

//cleares the form and bring back the card div
function clearForm () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.checked = false;
    showForm();
}

//obtaining the last hetem from the array
function displayBook() {
    const display = document.getElementById('cards');
    const books = document.querySelectorAll('.card');
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
    console.log(myLibrary);
}

//create and display the card
function createBook(item) {
    const card = document.createElement('div');
    const cards = document.querySelector(".cards");
    const titleCard = document.createElement('p');
    const authorCard = document.createElement('p');
    const pagesCard = document.createElement('p');
    const removeButton = document.createElement('button');
    const readButton = document.createElement('button');
    
    //book title
    card.classList.add('card');
    card.setAttribute('data-attribute', myLibrary.indexOf(item));
    titleCard.textContent = "Title: " + item.title;
    card.appendChild(titleCard);
    
    //book author
    authorCard.textContent = "Author: " + item.author;
    card.appendChild(authorCard);

    //book pages
    pagesCard.textContent = "Pages: " + item.pages;
    card.appendChild(pagesCard);

    //read button
    readButton.classList.add('button');
    card.appendChild(readButton);
    //set the button to read or not read
    if(item.status === false) {
        readButton.textContent = 'Not Read';
    } else {
        readButton.textContent = 'Read';
    }

    readButton.addEventListener('click', () => {
        item.status = !item.status;
        displayBook();
    });

    //remove button
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