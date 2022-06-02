const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

const usersWhoKnowThreePlusLanguages = users.filter(({ languages }) => languages.length >= 3);
console.log(usersWhoKnowThreePlusLanguages);

const userEmails = users.map(({ email }) => email);
console.log(userEmails);

const totalYearsOfExperience = users.reduce((acc, curr) => acc += curr.yearsOfExperience, 0);
console.log(totalYearsOfExperience);

const longestEmail = users.reduce((acc, curr) => curr.email.length > acc.email.length ? curr : acc).email;
console.log(longestEmail);

const namesInString = `My instructors are ${users.reduce((acc, curr) => [...acc, curr.name], []).join(', ')}`;

console.log(namesInString);

const uniqueLanguages = users.reduce((acc, curr) => {
    for (const lang of curr.languages) {
        if (!acc.includes(lang)) return [...acc, lang];
    }
}, []);


console.log(uniqueLanguages);
