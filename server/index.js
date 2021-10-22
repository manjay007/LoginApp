const base64 = require("base-64");
const express = require("express");
const User = require("./db");
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });

  if (user == null) {
    return res.status(404).json({ msg: "user not found" });
  }

  if (user.password == base64.decode(password)) {
    // logged in successfully
    return res.send({ success: true, id: user.id, name: user.name });
  } else {
    // wrong pass
    res.status(401).json({ msg: "Incorrect password!!" });
  }

  // save in db
  // let a = new User(data);
  // a.save((err, doc) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         console.log(doc);
  //     }
  // });
});

app.listen(5000, () => console.log("App running!!"));
