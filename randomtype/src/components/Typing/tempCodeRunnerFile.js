randomText100(noOfChar = 100) {
        let word = "";
        for (let i = 0; i <= 100; i++) {
            for (let i = 0; i <= Math.floor(Math.random() * 10); i++) {
                word += latter[Math.floor((Math.random() * 2.6) * 10)];
            }
            word += " ";
        }
        return word.slice(0, noOfChar);
    }