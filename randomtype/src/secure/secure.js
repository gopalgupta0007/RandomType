class Secure {
    encryptionKey = "your_secret_encryption_key"; // Replace with your own key
    encryptData(data, key) {
        const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
        return encryptedData;
    }

    decryptData(encryptedData, key) {
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }

    saveEncryptedDataToLocalStorage(data, key) {
        const encryptedData = this.encryptData(data, key);
        localStorage.setItem('encryptedData', encryptedData);
    }

    getDecryptedDataFromLocalStorage(key) {
        const encryptedData = localStorage.getItem('encryptedData');
        if (encryptedData) {
            console.log("encryptionKey => ");
            return this.decryptData(encryptedData, key);
        }
        return null;
    }
}

// Usage example
const child = new Secure();

// child.saveEncryptedDataToLocalStorage("Sensitive Data", encryptionKey);
// const decryptedData = child.getDecryptedDataFromLocalStorage(encryptionKey);
// console.log("Decrypted Data:", decryptedData);
export default child;