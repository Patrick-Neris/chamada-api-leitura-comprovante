const express = require("express");
const mindee = require("mindee");
const { uuid } = require("uuidv4");
const router = express.Router();

router.post("/", async (req, res) => {
  var path = req.body.path;

  let obj = {};

  const mindeeClient = new mindee.Client({
    apiKey: "90feff09f17391f2e68c6c5473a97636",
  });

  const inputSource = mindeeClient.docFromPath(path);

  const apiResponse = mindeeClient.parse(mindee.product.ReceiptV5, inputSource);

  await apiResponse.then((resp) => {
    obj = {
      establishmentName: resp.document.inference.prediction.supplierName.value,
      date: resp.document.inference.prediction.date.value,
      time: resp.document.inference.prediction.time.value,
      value: resp.document.inference.prediction.totalAmount.value,
      id: uuid(),
    };
    console.log(obj);
  });
  res.send(obj);
});

module.exports = router;
