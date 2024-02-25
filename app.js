const express = require("express");
const mountRoutes = require("./routes");
const app = express();

app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

mountRoutes(app);

if (process.env.NODE_ENV === "development") {
  app.use(function onerror(err, req, res, next) {
    console.log(err);
  });
}

module.exports = app;