document.addEventListener('DOMContentLoaded', () => {
    getQuote();
});

const quoteBox = document.querySelector('#quote-box');
const newQuoteBtn = document.querySelector('#new-quote');
const twButton = document.querySelector('#tweet-quote');
const textQuote = document.querySelector('#text');
const textAuthor = document.querySelector('#author');

const getQuote = () => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response => response.json())
        .then(data => {
            const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
            textQuote.innerHTML = randomQuote.quote;
            textAuthor.innerHTML = randomQuote.author;
        })
        .then(() => {
            const twText = encodeURIComponent(`"${textQuote.innerHTML}" - ${textAuthor.innerHTML} | `);
            twButton.setAttribute('href', `https://twitter.com/intent/tweet?hashtags=quote&text=${twText}`);
            quoteBox.classList.toggle('fade');
        })
        .catch(() => {
            textQuote.innerHTML = 'There was an error.';
            textAuthor.innerHTML = ' - ';
        });
}

newQuoteBtn.addEventListener('click', () => {
    quoteBox.classList.toggle('fade');
    setTimeout(() => {
        getQuote();
    }, 2000);
});
