const latter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const punctuationMarks = [".", ",", "!", "?", ";", ":"];

function generateRandomText() {
    //only for random text
    let word = "";
    for (let i = 0; i <= 100; i++) {
        for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
            word += latter[Math.floor((Math.random() * 2.6) * 10)];
        }
        word += " ";
    }
    return word;
}

function generateRandomNumber() {
    //only for random number
    let word = "";
    for (let i = 0; i <= 100; i++) {
        word += Math.floor(Math.random() * 10);
    }
    return word;
}

