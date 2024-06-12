/*  

TODO:
1 [x]. Create a Book function that has 4 properties: 
title, author, pages, isRead.
2 [x]. Create a function that take user's input of each of Book's 
properties. Then store it in an array.
3 [x]. Write a function that loop through the array and displays
each book on the page (either in table or in their own "card").
4 [x]. Create a "New Book" button that bring up a form allowing
users to input the details of a new book.
5 []. Add a button on each book's display to remove the book
from the library (need to associate the DOM element with the
actual book object. One solution is add a data-attribute
that corresponds to the index of the library array).
6 []. Add a button to change isRead status of each book.
(create a function that toggles a book's isRead status on 
the Book prototype instance)

*/

const myLibrary = [];
const tableHead = ["No.", "Title", "Author", "Pages", "Have you read it?", "Actions"];
const newBookDialog = document.querySelector("#new-book-dialog");

function Book(title, author, pages, isRead) {
  // constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function insertBookToMyLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayLastBook() {
  const lastBook = myLibrary.at(-1);
  insertNewRow(lastBook);
}

function removeBookAtIndex(element) {
  rowIndex = element.parentNode.rowIndex;
  myLibrary.splice(rowIndex - 1, 1);
  updateTableDisplay();
}

function updateTableDisplay() {
  const tableRows = document.querySelectorAll("#book-table tbody tr");

  tableRows.forEach((element) => {
    element.remove();
  });

  myLibrary.forEach((book) => {
    insertNewRow(book);
  });
}

function insertNewRow(book) {
  const tbodyEle = document.querySelector("#book-table tbody");
  const trEle = document.createElement("tr");
  const thEle = document.createElement("th");

  // increase the index of last book by 1
  // act as book number when display in table
  let bookNumber = myLibrary.indexOf(book) + 1;
  thEle.textContent = bookNumber.toString();
  trEle.appendChild(thEle);

  for (const prop in book) {
    const tdEle = document.createElement("td");
    tdEle.textContent = book[prop].toString();
    trEle.appendChild(tdEle);
  }

  const actionTdEle = document.createElement("td");
  const removeBtn = document.createElement("button");

  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeBookAtIndex(actionTdEle));

  tbodyEle.appendChild(trEle);
  trEle.appendChild(actionTdEle);
  actionTdEle.appendChild(removeBtn);
}

function showNewBookDialog() {
  const newBookForm = document.querySelector("#add-new-book-form");
  newBookForm.reset(); // clear form
}

function addNewBookFromInput() {
  let isAdded = false;
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const readStatus = document.querySelector('input[name="read-status"]:checked');
  const emptyTableRow = document.querySelector(".empty-table-row");

  if (emptyTableRow != null) {
    emptyTableRow.remove();
  }

  if (
    title.value != "" &&
    author.value != "" &&
    pages.value != "" &&
    readStatus != null
  ) {
    insertBookToMyLibrary(title.value, author.value, pages.value, readStatus.value);
    alert("New book has been added");
    showNewBookDialog();
    isAdded = true;
  } else {
    alert("Please make sure all fields are filled in");
  }

  return isAdded;
}

function loadTemplate() {
  insertBookToMyLibrary("new book 1", "minh", "10", "No, I haven't");
  insertBookToMyLibrary("new book 2", "minh", "15", "Yes, I have");
  insertBookToMyLibrary("new book 3", "minh", "10", "No, I haven't");

  myLibrary.forEach((book) => {
    insertNewRow(book);
  });
}

function clearForm() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const readStatus = document.querySelector('input[name="read-status"]:checked');

  title.value = "";
  author.value = "";
  pages.value = "";

  readStatus != null ? (readStatus.checked = false) : null;
}

function submitForm() {
  if (addNewBookFromInput()) {
    displayLastBook();
    newBookDialog.close();
  }
}

function setup() {
  const newBookBtn = document.querySelector("#new-book-btn");
  const closeBtn = document.querySelector("#close-btn");
  const submitBtn = document.querySelector("#form-submit-btn");
  const clearBtn = document.querySelector("#form-clear-btn");
  const newBookDialog = document.querySelector("#new-book-dialog");

  newBookBtn.addEventListener("click", () => newBookDialog.showModal());

  closeBtn.addEventListener("click", () => newBookDialog.close());

  submitBtn.addEventListener("click", () => submitForm());

  clearBtn.addEventListener("click", () => clearForm());
}

setup();

loadTemplate();
