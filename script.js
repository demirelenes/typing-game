const all_quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.'
];

let current_words = [];
let current_index = 0;
let starting_time = Date.now();

const textbox = document.getElementById('textbox');
const quote = document.getElementById('quote');
const message = document.getElementById('message');
const start = document.getElementById('start-button')

start.addEventListener('click', () => {
    const quote_index = Math.floor(Math.random() * all_quotes.length);
    current_words = all_quotes[quote_index].split(" ");
    current_index = 0;
    
    const span_words = current_words.map((word) => {
        return `<span>${word} </span>`
    });
    quote.innerHTML = span_words.join("");
    quote.childNodes[0].className = "highlight";
    message.textContent = "";

    textbox.value = "";
    textbox.focus();

    starting_time = new Date().getTime();
});

textbox.addEventListener("input", () => {
    const word = current_words[current_index];
    const typed_value = textbox.value;
    
    if (typed_value === word && current_index === current_words.length - 1) {
        const elapsed_time = new Date().getTime() - starting_time;
        const message_text = `CONGRATULATIONS! You finished in ${elapsed_time / 1000} seconds.`;
        message.innerText = message_text;
    }
    else if (typed_value.endsWith(" ") && typed_value.trim() == word) {
        textbox.value = "";
        current_index++;
        for (const word_element of quote.childNodes) {
            word_element.className = '';
        }
        quote.childNodes[current_index].className = 'highlight';
    }
    else if (word.startsWith(typed_value)) {
        textbox.className = '';
    }
    else {
        textbox.className = "error";
    }
});