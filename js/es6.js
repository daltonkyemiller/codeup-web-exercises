const users = [
    {
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash']
    },
    {
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript']
    },
    {
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php']
    },
    {
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql']
    },
    {
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php']
    }
];

// Filled in my name and email and added some programming languages I know to the languages array
// Replaced the `var` keyword with `const`
const name = 'dalton';
const email = 'dalton.kye.miller@gmail.com';
const languages = ['html', 'css', 'javascript'];

// Rewrote the object literal using object property shorthand
users.push({
    name,
    email,
    languages
});

// Replaced `var` with `let` in the following variable declarations
let emails = [];
let names = [];

// Rewrote the following using arrow functions
users.forEach((user) => emails.push(user.email));
users.forEach((user) => names.push(user.name));

// Replaced `var` with `let` in the following declaration
let developers = [];
users.forEach(({
                   name,
                   email,
                   languages
               }) => developers.push(`${name}'s email is ${email} ${name} knows ${languages.join(', ')}`));

// Use `let` for the following variable
let list = '<ul>';

// Rewrote the following loop to use a for...of loop
for (const dev of developers) {
    list += `<li>${dev}</li>`;
}
list += '</ul>';

