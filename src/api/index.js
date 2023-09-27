const express = require("express");
const router = express.Router();
const enviarMindee = require("./enviarMindee");
const enviarBanco = require("./enviarBanco");

router.get("/", (req, res) => {
  res.send("chamou");
});

router.use("/enviarMindee", enviarMindee);

router.use("/enviarBanco", enviarBanco);

module.exports = router;
