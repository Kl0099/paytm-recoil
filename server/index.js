const express = require("express");
const connect = require("./utils/database");
const userRoute = require("./routes/user");
const app = express();
const port = 4000;
connect();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
