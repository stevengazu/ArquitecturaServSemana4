const express = require("express");
const app = express();

require("./config/db.config");

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});
const router = require("./config/routes.config");
app.use("/api",router);

app.use((error,req, res,next) => {
console.error(error);
res.status(500).json({message: "Server Error"});
}); 

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});