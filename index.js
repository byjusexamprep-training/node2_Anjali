const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = 8000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true
})) 
app.use("/", routes)
app.listen(PORT, () => {
  console.log(`server started on ${PORT} `);
});

//extra" 
// knex('users').select("*").then(console.log,console.log)
