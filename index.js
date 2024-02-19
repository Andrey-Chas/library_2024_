const app = require("./app")
const port = 10000;

app.listen(port, () => {
  console.log(`Books API listening at http://localhost:${port}`);
});
