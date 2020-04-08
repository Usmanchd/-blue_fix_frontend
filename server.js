const express = require("express");
const app = express();
const connectDb = require("./config/db");
const users = require("./route/api/users");
const auth = require("./route/api/auth");

connectDb();
// Init BodyParsr
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
