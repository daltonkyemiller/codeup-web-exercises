(function () {
    'use strict';

    // ############################## ME object ############################## //
    const person = {
        firstName: 'Dalton',
        lastName: 'Miller'
    };

    console.log(person.firstName);
    console.log(person.lastName);

    // Function that returns a hello message
    person.sayHello = function () {
        return 'Hello from ' + this.firstName + ' ' + this.lastName + '!';
    };

    console.log(person.sayHello());


    // ############################## HEB shoppers ############################## //
    let shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];


    /**
     * The function takes a shopper object as an argument and returns a new amount based on the amount of the shopper
     * object and the discount
     * @param shopper - an object with a name, amount, and discount property
     */
    function calculateDiscount(shopper) {
        let discount = 0;
        if (shopper.amount > 200)
            discount = .12;

        shopper.discount = discount;
        let newAmt = shopper.amount - (shopper.amount * shopper.discount);
        console.log(`${shopper.name} has a discount of ${shopper.discount * 100}% and will pay $${newAmt}`);
    }

    shoppers.forEach(shopper => calculateDiscount(shopper));

    let books = [
        {
            title: 'After Dark',
            author: {
                firstName: 'Haruki',
                lastName: 'Murakami'
            }
        },
        {
            title: '1984',
            author: {
                firstName: 'George',
                lastName: 'Orwell'
            }
        },
        {
            title: 'High Fidelity',
            author: {
                firstName: 'Nick',
                lastName: 'Hornby'
            }
        },
        {
            title: '12 Rules for Life',
            author: {
                firstName: 'Jordan',
                lastName: 'Peterson'
            }
        },
        {
            title: 'Bleak House',
            author: {
                firstName: 'Charles',
                lastName: 'Dickens'
            }
        }
    ];

    books.forEach((book, idx) => {
        console.group(book.title);
        console.log(`Book #${idx + 1}`);
        console.log(showBookInfo(book));
        console.groupEnd();
    });


    // ############################## Bonus ############################## //
    /**
     * It takes a title and an author name as arguments, splits the author name into first and last name,
     * and returns an object with the title and author name
     * @param title - The title of the book.
     * @param authorName - a string with the author's first and last name separated by a space
     * @returns An object with a title and author property.
     */

    function createBook(title, authorName) {
        let nameArr = authorName.split(' ');
        return {
            title,
            author: {
                firstName: nameArr[0],
                lastName: nameArr[1]
            }
        };
    }

    let newBooks = [
        createBook('After Dark', 'Haruki Murakami'),
        createBook('1984', 'George Orwell'),
        createBook('High Fidelity', 'Nick Hornby'),
        createBook('12 Rules for Life', 'Jordan Peterson'),
        createBook('Bleak House', 'Charles Dickens')
    ];

    function showBookInfo(book) {
        return `Title: ${book.title}\nAuthor: ${book.author.firstName} ${book.author.lastName}`;
    }

})();
