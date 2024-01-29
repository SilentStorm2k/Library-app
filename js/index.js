const myLibrary = [];

function Book(title, author, pages, isAlreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAlreadyRead = isAlreadyRead;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.isAlreadyRead ? "already read" : "not read yet"}`;
};

const book1 = new Book("The hobbit", "J.R.R. Tolkien", 295, false);
