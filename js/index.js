const myLibrary = [];
const display = document.querySelector('.book-container');

function Book(title, author, pages, isAlreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAlreadyRead = isAlreadyRead;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.isAlreadyRead ? "already read" : "not read yet"}`;
};

function addBookToLibrary (book) {
    myLibrary.push(book);
    showBooks();
}

function showBooks () {
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
    for (let book of myLibrary)
        addBookToDisplay(book);
    addNewBookButton();
}

function addBookToDisplay (book) {
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const isAlreadyRead = document.createElement('div');
    const read = document.createElement('input');
    const notRead = document.createElement('input');
    const titleText = document.createElement('div');
    const authorText = document.createElement('div');
    const pagesText = document.createElement('div');
    const isAlreadyReadText = document.createElement('div');
    const deleteButton = document.createElement('button');
    const entry = document.createElement('div');
    entry.classList.add('card');
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.type = "radio";
    read.checked = book.isAlreadyRead;
    notRead.type = "radio"
    notRead.checked = !book.isAlreadyRead;
    read.name = book.info();
    notRead.name = book.info();
    isAlreadyRead.append(read, notRead);
    titleText.textContent = "Title:";
    authorText.textContent = "Author:";
    pagesText.textContent = "Pages:";
    const deleteImage = document.createElement('img');
    deleteImage.src = "assets/images/delete.svg";
    deleteButton.appendChild(deleteImage);
    deleteButton.addEventListener("click", () => {
        const bookIndex = myLibrary.indexOf(book);
        if (bookIndex > -1)
            myLibrary.splice(bookIndex, 1);
        console.log(myLibrary, bookIndex)
        showBooks();
    });
    isAlreadyReadText.textContent = "Already read:";
    entry.append(titleText, title, authorText, author, pagesText, pages, isAlreadyReadText, isAlreadyRead, deleteButton);
    display.appendChild(entry);
}

function addNewBookButton () {
    const entry = document.createElement('div');
    entry.classList.add('card');
    const addButton = document.createElement('button');
    const addButtonImage = document.createElement('img');
    addButtonImage.src = "assets/images/add.svg";
    addButton.appendChild(addButtonImage);
    addButton.classList.add("add-button");
    addButton.style.gridArea = "1 / 1 / 6 / 3";
    addButton.addEventListener("click", getNewBook);
    entry.appendChild(addButton);
    display.appendChild(entry);
}

const getUserInput = document.getElementById("userInput");
function getNewBook () {
    getUserInput.showModal();
}

const book1 = new Book("The hobbit", "J.R.R. Tolkien", 295, false);
const book2 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, false);

addBookToLibrary(book1);
addBookToLibrary(book2);