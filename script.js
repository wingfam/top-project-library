/*  

TODO:
1. Create a Book function that has 4 properties: 
title, author, pages, isRead.
2. Create a function that take user's input of each of Book's 
properties. Then store it in an array.
3. Write a function that loop through the array and displays
each book on the page (either in table or in ther own "card").
4. Create a "New Book" button that bring up a form allowing
users to input the details of a new book.
5. Add a button on each book's display to remove the book
from the library (need to associate the DOM element with the
actual book object. One solution is add a data-attribute
that corresponds to the index of the library array).
6. Add a button to change isRead status of each book.
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

  this.showInfo = function () {
    return this.title + " by " + this.author + ", " + this.pages + ", " + this.isRead;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  // console.log(newBook.showInfo());
  myLibrary.push(newBook);
}

// Test
addBookToLibrary("Dune", "Frank Herbert", "896", "not read yet");
addBookToLibrary(
  "Do Androids Dream of Electric Sheep?",
  "Phillip K, Dick",
  "210",
  "not read yet"
);

myLibrary.forEach(book => console.log(book.title));