const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = books[isbn];
  res.send(JSON.stringify(book, null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   let books_by_author = [];
   let isbns = Object.keys(books);
   let author = req.params.author;
   
   for (let isbn of isbns) {
    let book = books[isbn];
    if (book["author"] == author) {
        books_by_author.push(book);
    }
   };
   res.send(JSON.stringify(books_by_author, null, 4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let books_by_title = {};
    let isbns = Object.keys(books);
    let title = req.params.title;
    
    for (let isbn of isbns) {
     let book = books[isbn];
     if (book["title"] == title) {
         books_by_title[isbn] = book;
     }
    };
    res.send(JSON.stringify(books_by_title, null, 4))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
