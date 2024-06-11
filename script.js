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
  const tbodyEle = document.querySelector("#book-table tbody");
  const lastBook = myLibrary.at(-1);

  const trEle = document.createElement("tr");
  const thEle = document.createElement("th");

  // increase the index of last book by 1
  // act as book number when display in table
  let bookNumber = myLibrary.indexOf(lastBook);
  bookNumber = bookNumber + 1;
  thEle.textContent = bookNumber.toString();

  tbodyEle.appendChild(trEle);
  trEle.appendChild(thEle);

  for (const prop in lastBook) {
    const tdEle = document.createElement("td");
    tdEle.textContent = lastBook[prop].toString();
    trEle.appendChild(tdEle);
  }
}

function showNewBookDialog() {
  const newBookForm = document.querySelector("#add-new-book-form");
  newBookForm.reset(); // clear form
}

function addNewBook() {
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

function setup() {
  const newBookBtn = document.querySelector("#new-book-btn");
  const closeBtn = document.querySelector("#close-btn");
  const submitBtn = document.querySelector("#form-submit-btn");
  const clearBtn = document.querySelector("#form-clear-btn");
  const newBookDialog = document.querySelector("#new-book-dialog");

  newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    newBookDialog.close();
  });

  submitBtn.addEventListener("click", (e) => {
    if (addNewBook()) {
      displayLastBook();
      newBookDialog.close();
    }
  });

  clearBtn.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const readStatus = document.querySelector('input[name="read-status"]:checked');

    title.value = "";
    author.value = "";
    pages.value = "";

    readStatus != null ? (readStatus.checked = false) : null;
  });
}

setup();
