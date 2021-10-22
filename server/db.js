const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_URI || "mongodb://localhost:27017/manjay_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("Error connecting to DB !", err);
    });

const userSchema = new mongoose.Schema({
    id: {
        unique: true,
        type: String,
    },
    name: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    username: {
        unique: true,
        type: String,
        maxlength: 32,
        trim: true,
    },
    password: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
