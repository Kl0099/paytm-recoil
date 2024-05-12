const express = require("express");
const app = express();
const port = 4000;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
