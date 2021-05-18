// show all books
const booksId = JSON.parse(localStorage.getItem("BOOK_LIST"));

if (booksId !== null) {
    booksId.forEach(item => {
        let data = JSON.parse(localStorage.getItem(item));

        if (data["isComplete"] === false) {
            document.getElementById("incompleteBookshelfList").innerHTML +=
                `<article id="ID_${item}" class="book_item">
                    <h3 id="title">${data["title"]}</h3>
                        <p>Penulis: ${data["author"]}</p>
                        <p>Tahun: ${data["year"]}</p>
                    <div class="action">
                        <button onclick="changeStat('${item}')"  class="green">Selesai dibaca</button>
                        <button onclick="del('${item}')"  class="red">Hapus buku</button>
                    </div>
                </article>`;
        } else {
            document.getElementById("completeBookshelfList").innerHTML +=
                `<article id="ID_${item}" class="book_item">
                    <h3 id="title">${data["title"]}</h3>
                        <p>Penulis: ${data["author"]}</p>
                        <p>Tahun: ${data["year"]}</p>
                    <div class="action">
                        <button onclick="changeStat('${item}')" class="green">Belum selesai dibaca</button>
                        <button onclick="del('${item}')"  class="red">Hapus buku</button>
                    </div>
                </article>`;
        }
    });
}

// add book
document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const id = Date.now();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const status = document.getElementById("inputBookIsComplete").checked;
    const book = {
        "id": id,
        "title": title,
        "author": author,
        "year": year,
        "isComplete": status
    };

    localStorage.setItem(`BOOK_${id}`, JSON.stringify(book));

    if (localStorage.getItem("BOOK_LIST") === null) {
        localStorage.setItem("BOOK_LIST", JSON.stringify([`BOOK_${id}`]));
    } else {
        localStorage.setItem(
            "BOOK_LIST",
            JSON.stringify([...JSON.parse(localStorage.getItem("BOOK_LIST")), `BOOK_${id}`])
        );
    }

    window.location.reload();
}

//change status
function changeStat(id) {
    let book = JSON.parse(localStorage.getItem(id));

    if (book["isComplete"] === false) {
        book["isComplete"] = true;
    } else {
        book["isComplete"] = false;
    }

    localStorage.setItem(id, JSON.stringify(book));
    window.location.reload();
}

//delete
function del(id) {
    const bookList = JSON.parse(localStorage.getItem("BOOK_LIST"));
    const idx = bookList.indexOf(id);

    if (idx > -1) {
        bookList.splice(idx, 1);
    }

    localStorage.setItem("BOOK_LIST", JSON.stringify(bookList))
    localStorage.removeItem(id);
    window.location.reload();
}

//filter 
function filterBook() {
    const booksId = JSON.parse(localStorage.getItem("BOOK_LIST"));
    let search = document.getElementById("searchBookTitle").value;

    booksId.forEach(item => {
        let data = JSON.parse(localStorage.getItem(item));
        if (data["title"].includes(search)) {
            document.getElementById(`ID_${item}`).style.display = "";
        } else {
            document.getElementById(`ID_${item}`).style.display = "none";
        }
    });
}