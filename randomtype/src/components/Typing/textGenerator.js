export const latter = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    ",",
    ",",
    "!",
    "?",
    ";",
    ":",
    " ", 
    '<', 
    '>', 
    ',', 
    '.', 
    '?', 
    '/',
    ';',
    ':',
    "'",
    '"',
    '{',
    '[',
    ']',
    '}',
    '|',
    '_',
    '-',
    '+',
    '='
];

export function generateRandomText() {
    //only for random text
    let word = "";
    for (let i = 0; i <= 100; i++) {
        for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
            word += latter[Math.floor(Math.random() * 90)];
        }
        word += " ";
    }
    return word;
}

export function generateRandomNumber() {
    //only for random number
    let word = "";
    for (let i = 0; i <= 100; i++) {
        word += Math.floor(Math.random() * 10);
    }
    return word;
}

