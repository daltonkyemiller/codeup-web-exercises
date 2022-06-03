import { GITHUB_API_KEY } from './keys.js';

const GITHUB_API_URL = 'https://api.github.com';


const getDateOfLastCommit = (username) => {
    if (username === undefined) throw new Error('"username" must be defined');

    const headers = { 'Authorization': `token ${GITHUB_API_KEY}` };

    return fetch(`${GITHUB_API_URL}/users/${username}/events/public`, { headers })
        .then(eventsRes => eventsRes.json())
        .then(eventData => {
            const pushes = eventData.filter(event => event.type === 'PushEvent');
            const mostRecentCommitUrl = pushes[0].payload.commits[0].url;
            return fetch(mostRecentCommitUrl, { headers });
        })
        .then(commitRes => commitRes.json())
        .then(commitData => new Date(commitData.commit.author.date));

};


getDateOfLastCommit('daltonkyemiller').then(date => console.log(date));


const wait = (length) => new Promise((resolve, reject) =>
    setTimeout(() => resolve(length), length));

wait(1000).then(length => {
    console.log(`hello after ${length / 1000}s`);
});
wait(3000).then(length => {
    console.log(`hello after ${length / 1000}s`);
});