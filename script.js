/*  

TODO:
1 [x]. Create a Book function that has 4 properties: 
title, author, pages, isRead.
2 [x]. Create a function that take user's input of each of Book's 
properties. Then store it in an array.
3 []. Write a function that loop through the array and displays
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
  // console.log(newBook.showInfo());
  myLibrary.push(newBook);
}

function displayBookList() {
  /*
    GET the tbody element of table that has id of "book-table"
    FOR each book object in myLibrary
      INIT the tr element
      INIT the th element
      SET the th scope attribute equal "row"
      CALL appendChild with tr and th element
      CALL appendChild with tbody and tr element
      FOR each property in book object
        INIT a td element
        SET td element textcontent to a property
        CALL appendChild with tr and td element
      END FOR
    END FOR
  */

    let count = 1;
    const tbodyEle = document.querySelector("#book-table tbody");
    myLibrary.forEach(book => {
      let trEle = document.createElement("tr");
      tbodyEle.appendChild(trEle);

      let thEle = document.createElement("th");
      thEle.setAttribute("scope", "row");

      let lastThEle = document.querySelector("th");
      lastThEle.textContent == count;

      let lastTrEle = document.querySelector("tr");
      lastTrEle = lastTrEle.appendChild(lastThEle);

      for (const prop in book) {
        let tdEle = document.createElement("td");
        console.log(book[prop]);
        tdEle.textContent = book[prop].toString();
        trEle.appendChild(tdEle);
      }

      count++;
    });
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

displayBookList();