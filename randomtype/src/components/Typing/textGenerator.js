const latter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const punctuationMarks = [".", ",", "!", "?", ";", ":"];
class Random {
    constructor(noOfChar=100){
        this.noOfChar = noOfChar;
    }
    randomText100() {
        //only for random text
        console.log("this.noOfChar =>"+this.noOfChar);
        let word = "";
        for (let i = 0; i <= 100; i++) {
            for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
                word += latter[Math.floor((Math.random() * 2.6) * 10)];
            }
            word += " ";
        }
        return word.slice(0, this.noOfChar)+".";
    }
    randomNumber100() {
        //only for random number
        let word = "";
        for (let i = 0; i <= 100; i++) {
            word += Math.floor(Math.random() * 10);
        }
        return word.slice(0, this.noOfChar);
    }
}

const obj1 = new Random();
console.log(obj1.randomNumber100())
