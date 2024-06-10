/*  

TODO:
1 [x]. Create a Book function that has 4 properties: 
title, author, pages, isRead.
2 [x]. Create a function that take user's input of each of Book's 
properties. Then store it in an array.
3 [x]. Write a function that loop through the array and displays
each book on the page (either in table or in their own "card").
4 []. Create a "New Book" button that bring up a form allowing
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

function Book(title, author, pages, isRead) {
  // constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayBookList() {
    let count = 1;
    const tbodyEle = document.querySelector("#book-table tbody");
    myLibrary.forEach(book => {
      let trEle = document.createElement("tr");
      let thEle = document.createElement("th");
      
      thEle.textContent = count.toString();
      tbodyEle.appendChild(trEle);
      trEle.appendChild(thEle);

      for (const prop in book) {
        let tdEle = document.createElement("td");
        tdEle.textContent = book[prop].toString();
        trEle.appendChild(tdEle);
      }

      count++;
    });
}

function showAddNewBookForm() {
  const newBookForm = document.querySelector("#add-new-book-form");
  const formClassAtt = newBookForm.getAttribute("class");
  if (formClassAtt === "close") {
    newBookForm.setAttribute("class", "show");
  } else {
    newBookForm.setAttribute("class", "close");
  }
}

function addNewBook() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector('input[name="read-status"]:checked').value;
  
  if (readStatus != null) {
    addBookToLibrary(title, author, pages, readStatus);
    showAddNewBookForm();
    alert("New book has been added");
  } else {
    alert("Please make sure to select \"Have you read it?\"");
  }
}

// Test
addBookToLibrary("Dune", "Frank Herbert", "896", "not read yet");
addBookToLibrary(
  "Do Androids Dream of Electric Sheep?",
  "Phillip K, Dick",
  "210",
  "not read yet"
);

displayBookList();