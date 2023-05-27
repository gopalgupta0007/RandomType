const mongoose = require("mongoose");

const Connection = () => {
    mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("DB connected"))
        .catch(err => console.error(err))
}

module.exports = Connection;

