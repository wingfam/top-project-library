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
5 [x]. Add a button on each book's display to remove the book
from the library (need to associate the DOM element with the
actual book object. One solution is add a data-attribute
that corresponds to the index of the library array).
6 [X]. Add a button to change isRead status of each book.
(create a function that toggles a book's isRead status on 
the Book prototype instance)

*/

const myLibrary = [];
const newBookDialog = document.querySelector("#new-book-dialog");

function Book(title, author, pages, readStatus) {
  // constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;

  this.toggleReadStatus = function () {
    if (this.readStatus == "Not started") {
      this.readStatus = "Reading";
    } else if (this.readStatus == "Reading") {
      this.readStatus = "Done";
    } else if (this.readStatus == "Done") {
      this.readStatus = "Not started";
    }
  };
}

function insertBookToMyLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function removeBookAtIndex(element) {
  const rowIndex = element.parentNode.rowIndex;
  myLibrary.splice(rowIndex - 1, 1);
  updateTableDisplay();
}

function changeReadStatus(book, element) {
  book.toggleReadStatus();
  const rowIndex = element.parentNode.rowIndex;
  const statusColumn = document.querySelector(
    "table tbody tr:nth-child(" + rowIndex + ") td:nth-child(5)"
  );
  displayReadStatus(book, statusColumn);
}

function displayLastBook() {
  const lastBook = myLibrary.at(-1);
  insertNewRow(lastBook);
}

function showNewBookDialog() {
  const newBookForm = document.querySelector("#add-new-book-form");
  newBookForm.reset(); // clear form
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

function displayReadStatus(book, statusColumn) {
  if (book["readStatus"] == "Not started") {
    statusColumn.textContent = "Not started";
  } else if (book["readStatus"] == "2") {
    statusColumn.textContent = "Reading";
  } else if (book["readStatus"] == 3) {
    statusColumn.textContent = "Done";
  }
}

function submitForm() {
  if (addNewBookFromInput()) {
    displayLastBook();
    newBookDialog.close();
  }
}

function loadTemplate() {
  if (myLibrary.length == 0) {
    insertBookToMyLibrary("new book 1", "minh", "10", 1);
    insertBookToMyLibrary("new book 2", "minh", "15", 2);
    insertBookToMyLibrary("new book 3", "minh", "10", 3);
    updateTableDisplay();
  }
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
    // when the loop reach toggleReadStatus function,
    // it won't add to the table and continue to next the prop
    if (prop === "toggleReadStatus") continue;
    const tdEle = document.createElement("td");
    tdEle.textContent = book[prop].toString();
    trEle.appendChild(tdEle);
  }

  const actionTdEle = document.createElement("td");
  const removeBtn = document.createElement("button");
  const changeReadStatusBtn = document.createElement("button");

  removeBtn.textContent = "Remove";
  changeReadStatusBtn.textContent = "Change Status";
  removeBtn.addEventListener("click", () => removeBookAtIndex(actionTdEle));
  changeReadStatusBtn.addEventListener("click", () =>
    changeReadStatus(book, actionTdEle)
  );

  tbodyEle.appendChild(trEle);
  trEle.appendChild(actionTdEle);
  actionTdEle.appendChild(removeBtn);
  actionTdEle.appendChild(changeReadStatusBtn);
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

function setup() {
  const newBookBtn = document.querySelector("#new-book-btn");
  const closeBtn = document.querySelector("#close-btn");
  const submitBtn = document.querySelector("#form-submit-btn");
  const clearBtn = document.querySelector("#form-clear-btn");
  const newBookDialog = document.querySelector("#new-book-dialog");
  const loadTemplateBtn = document.querySelector("#load-template-btn");

  newBookBtn.addEventListener("click", () => newBookDialog.showModal());
  closeBtn.addEventListener("click", () => newBookDialog.close());
  submitBtn.addEventListener("click", () => submitForm());
  clearBtn.addEventListener("click", () => clearForm());
  loadTemplateBtn.addEventListener("click", () => loadTemplate());
}

setup();

loadTemplate();
