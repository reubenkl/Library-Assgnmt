//book class
class Book{
    constructor(title, author, genre, price, isbn){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.isbn = isbn;
    }
}

//Storage class -> handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
} 

//UI class -> handle UI tasks
class UI{
    static displayBooks(){
        
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.isbn}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#addbook-form');
        container.insertBefore(div, form);

        //vanish alerts
        setTimeout(()=> document.querySelector('.alert').remove(), 3000)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#genre').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#isbn').value = '';
    }

}

//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

//Event : Add a book
document.querySelector('#addbook-form').addEventListener('submit', (e) =>{

    //prevent actual submit
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;
    const price = document.querySelector('#price').value;
    const isbn = document.querySelector('#isbn').value;

    //validate

    if(title === '' || author === '' || genre === '' || price === '' || isbn === ''){
        UI.showAlert('Please fill all feilds!', 'danger');
    }else{
        //instantiate book
        const book = new Book(title, author, genre, price, isbn);
        
    
        //add book to UI list
        UI.addBookToList(book);

        //add book to store
        Store.addBook(book);

        //successfully added book
        UI.showAlert('Book added successfully', 'success');
    
        //clear fields
        UI.clearFields();
    }


    //Event : remove a book
    document.querySelector('#book-list').addEventListener('click', (e)=>{
        //remove book from UI
        UI.deleteBook(e.target);
        
        //remove book from store
        Store.removeBook
        (e.target.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.previousElementSibling.textContent);

        UI.showAlert('Book Deleted', 'success');
    });
});