const app = require("./app")
const port = 10000;

app.listen(port, () => {
  console.log(`Library app listening at http://localhost:${port}`);
});
