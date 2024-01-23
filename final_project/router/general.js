const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Function to check if the user exists
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  let username = req.query.username;
  let password = req.query.password;
  
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
})
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
    let isbn = req.params.isbn;
    let review = books[isbn]["reviews"];
    res.send(JSON.stringify(review));
});

module.exports.general = public_users;
