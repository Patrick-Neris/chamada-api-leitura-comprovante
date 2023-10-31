const express = require("express");
const routers = require("./api");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use("/", routers);
app.use(cors(corsOptions));

app.listen(8800, () => {
  console.log("Ligado");
});
