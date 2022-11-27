/* Render site structural elements */

window.onload = () => {
    const fragment = new DocumentFragment();
    fragment.append(
        createHeader(),
        createMain(),
        createFooter()
    );
    document.body.append(fragment);
}

/* Create header element*/

const createHeader = () => {
    const header = document.createElement("header");
    header.className = "header";

    const heading = document.createElement("h1");
    heading.innerHTML = "Welcome to our amazing bookshop";
    heading.className = "welcome-msg";

    const btnCheck = document.createElement("btn");
    btnCheck.innerHTML = "check our books";
    btnCheck.className = "btn-check";

    header.append(heading, btnCheck);

    // Remove header on button click to display the book catalogue
    btnCheck.onclick = function() {
        setTimeout(() => {
            header.style.display = "none";
        }, 300);
    }

    return header;
}

/* Create main element */

const createMain = () => {
    const main = document.createElement("main");
    main.className = "main";

    main.append(createShoppingBag(), createCatalogueTitle(), renderBookCards());

    return main;
}

/* Create a shopping bag */

const createShoppingBag = () => {
    const shoppingBag = document.createElement("div");
    shoppingBag.classList.add("shopping-bag");
    shoppingBag.bookCount = 0;
    shoppingBag.innerHTML = '<span class="cart-icon"><i class="fa-solid fa-bags-shopping"></i></span><strong class="book-count">0</strong>';

    return shoppingBag;
}

/* Create a book catalogue title */

const createCatalogueTitle = () => {
    const catalogueTitle = document.createElement("h2");
    catalogueTitle.className = "catalogue-title";
    catalogueTitle.innerHTML = "Book Catalogue";

    return catalogueTitle;
}

/* Create and render book cards */

function renderBookCards() {
    const catalogueContainer = document.createElement("section");
    catalogueContainer.className = "catalogue-container";

    fetch("assets/data/books.json")
    .then(response => {
        return response.json();
    })
    .then(books => {
        books.forEach(book => {
            const bookCard = document.createElement("div");
            const bookCover = document.createElement("img");
            const bookInfo = document.createElement("div");
            const bookTitle = document.createElement("h3");
            const bookAuthor = document.createElement("h4");
            const bookPrice = document.createElement("p");
            const bookBtnsContainer = document.createElement("div");
            const btnShowMore = document.createElement("btn");
            const btnAddToCart = document.createElement("btn");

            bookCard.className = "book-card";
            bookCover.className = "book-card-img";
            bookInfo.className = "book-info";
            bookTitle.className = "book-title";
            bookAuthor.className = "book-author";
            bookPrice.className = "book-price";
            bookBtnsContainer.className = "book-btns-container";
            btnShowMore.classList.add("btn", "btn-show-more");
            btnAddToCart.classList.add("btn", "btn-add-to-cart");
            bookCover.src = book.imageLink;
            bookTitle.innerHTML = book.title;
            bookAuthor.innerHTML = book.author;
            bookPrice.innerText = `${book.price}$`;
            btnShowMore.textContent = "Show More";
            btnAddToCart.textContent = "Add to Cart";

            bookBtnsContainer.append(btnShowMore, btnAddToCart);
            bookInfo.append(bookAuthor, bookTitle, bookPrice, bookBtnsContainer);
            bookCard.append(bookCover, bookInfo);
            catalogueContainer.append(bookCard);

            // create and open a show more popup modal window on show more btn click
            btnShowMore.onclick = function() {
                const showMorePopup = document.createElement("div");
                showMorePopup.classList = "show-more-popup";
                showMorePopup.innerHTML = book.description;

                const btnClose = document.createElement("btn");
                btnClose.classList.add("btn-close-show-more");
                btnClose.textContent = "close";

                showMorePopup.append(btnClose);
                bookCard.append(showMorePopup);
             // close a show more popup modal window on close btn click
                btnClose.onclick = function() {
                    showMorePopup.remove();
                }
             }
       });
    });
    return catalogueContainer;
}

/* Create footer element */

const createFooter = () => {
    const footer = document.createElement("footer");
    footer.className = "footer";

    const designInfo = document.createElement("div");
    designInfo.className = "design-info";

    const authorName = document.createElement("p");
    authorName.innerHTML = "&copy; iLonaDev";

    const designDate = document.createElement("p");
    designDate.innerHTML = "Nov 2022";

    designInfo.append(authorName, designDate);
    footer.append(designInfo);

    return footer;
}








