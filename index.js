const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
//Middleware run every time like app.use() and these two middlewares are used for forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//routing
app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf8",
    function (err, filedata) {
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", function (req, res) {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});
// app.get("/profile/:username", function (req, res) {
//   res.send(req.params.username);
// });
// app.get("/author/:username/:age", function (req, res) {
//   res.send(`welcome ${req.params.username} your age is ${req.params.age}`);
// });
app.listen(3000, function () {
  console.log("surver still running");
});
