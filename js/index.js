const myLibrary = [];
const display = document.querySelector(".book-container");

class Book {
	constructor(title, author, pages, isAlreadyRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isAlreadyRead = isAlreadyRead;
	}

	info() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${
			this.isAlreadyRead ? "already read" : "not read yet"
		}`;
	}
}

function addBookToLibrary(book) {
	let isInLibrary = myLibrary.findIndex((b) => b.info() === book.info());
	if (isInLibrary === -1) myLibrary.push(book);
	showBooks();
}

function showBooks() {
	while (display.firstChild) {
		display.removeChild(display.firstChild);
	}
	for (let book of myLibrary) addBookToDisplay(book);
	addNewBookButton();
}

function addBookToDisplay(book) {
	const title = document.createElement("div");
	const author = document.createElement("div");
	const pages = document.createElement("div");
	const isAlreadyRead = document.createElement("div");
	const read = document.createElement("input");
	const notRead = document.createElement("input");
	const titleText = document.createElement("div");
	const authorText = document.createElement("div");
	const pagesText = document.createElement("div");
	const isAlreadyReadText = document.createElement("div");
	const deleteButton = document.createElement("button");
	const entry = document.createElement("div");
	entry.classList.add("card");
	title.textContent = book.title;
	author.textContent = book.author;
	pages.textContent = book.pages;
	read.type = "radio";
	read.checked = book.isAlreadyRead;
	read.classList.add("read");
	notRead.type = "radio";
	notRead.checked = !book.isAlreadyRead;
	notRead.classList.add("notRead");
	read.name = book.info();
	notRead.name = book.info();
	isAlreadyRead.append(read, notRead);
	titleText.textContent = "Title:";
	authorText.textContent = "Author:";
	pagesText.textContent = "Pages:";
	const deleteImage = document.createElement("img");
	deleteImage.src = "assets/images/delete.svg";
	deleteButton.appendChild(deleteImage);
	deleteButton.addEventListener("click", () => {
		const bookIndex = myLibrary.indexOf(book);
		if (bookIndex > -1) myLibrary.splice(bookIndex, 1);
		console.log(myLibrary, bookIndex);
		showBooks();
	});
	isAlreadyReadText.textContent = "Already read:";
	entry.append(
		titleText,
		title,
		authorText,
		author,
		pagesText,
		pages,
		isAlreadyReadText,
		isAlreadyRead,
		deleteButton
	);
	display.appendChild(entry);
}

function addNewBookButton() {
	const entry = document.createElement("div");
	entry.classList.add("card");
	const addButton = document.createElement("button");
	const addButtonImage = document.createElement("img");
	addButtonImage.src = "assets/images/add.svg";
	addButton.appendChild(addButtonImage);
	addButton.classList.add("add-button");
	addButton.style.gridArea = "1 / 1 / 6 / 3";
	addButton.addEventListener("click", getNewBook);
	entry.appendChild(addButton);
	display.appendChild(entry);
}

const getUserInput = document.getElementById("userInput");
const confirmBtn = getUserInput.querySelector("#confirmBtn");
const form = getUserInput.querySelector("form");

// confirmBtn.addEventListener("click", (event) => {
// 	event.preventDefault();
// 	console.log(form.checkValidity());
// 	const formData = new FormData(form);
// 	console.log(formData);
// 	const enteredDetails = Object.fromEntries(formData);
// 	const newBook = new Book(
// 		enteredDetails.title,
// 		enteredDetails.author,
// 		enteredDetails.pages,
// 		enteredDetails.isAlreadyRead == "true" ? true : false
// 	);
// 	getUserInput.close(newBook.info());
// 	addBookToLibrary(newBook);
// });

function getNewBook() {
	getUserInput.showModal();
	getUserInput.addEventListener("close", (e) => {
		console.log(getUserInput.returnValue);
	});
}

const book1 = new Book("The hobbit", "J.R.R. Tolkien", 295, false);
const book2 = new Book(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	223,
	false
);

addBookToLibrary(book1);
addBookToLibrary(book2);
// addInputValidation();
addFormEventListener();

function addInputValidation() {
	const form = document.querySelector("form");
	const title = form.querySelector('input[name="title"]');
	const author = form.querySelector('input[name="author"]');
	const pages = form.querySelector('input[name="pages"]');
	const read = form.querySelector('input[name="isAlreadyRead"]');

	console.log(title, author, pages, read);
	title.addEventListener("input", (e) => {
		if (!e.target.validity.valueMissing)
			e.target.setCustomValidity("Title must not be empty");
		else e.target.setCustomValidity("");
	});
	author.addEventListener("input", (e) => {
		if (e.target.checkValidity()) console.log(e.target.validity);
	});
	pages.addEventListener("input", (e) => {
		if (!e.target.validity.valid)
			e.target.setCustomValidity("Pages must be number > 0");
		else e.target.setCustomValidity("");
	});
	read.addEventListener("input", (e) => {
		if (!e.target.validity.valueMissing)
			e.target.setCustomValidity("must choose a value");
		else e.target.setCustomValidity("");
	});
}

function addFormEventListener() {
	form.addEventListener("submit", (event) => {
		const myForm = event.target;
		if (myForm.checkValidity()) {
			event.preventDefault();
			const formData = new FormData(form);
			const enteredDetails = Object.fromEntries(formData);
			const newBook = new Book(
				enteredDetails.title,
				enteredDetails.author,
				enteredDetails.pages,
				enteredDetails.isAlreadyRead == "true" ? true : false
			);
			getUserInput.close();
			addBookToLibrary(newBook);
		} else {
			event.preventDefault();
			console.error("invalid form");
		}
	});
}
